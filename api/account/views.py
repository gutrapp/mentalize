from django.db import transaction
from rest_framework import viewsets
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView

from account.models import User
from account.serializers import UserSerializer
from clinic.serializers import AddressSerializer, CellphoneSerializer
from .models import Person, User
from .filters import PersonFilter, UserFilter
from .serializers import PersonSerializer, AdminSerializer, UserSerializer


class PersonViews(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    filterset_class = PersonFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]


class UserViews(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_class = UserFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]


@method_decorator(csrf_protect, name="dispatch")
class RegisterPerson(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """Register"""
        try:
            with transaction.atomic():
                password = request.data["user"]["password"]
                user = UserSerializer(data=request.data["user"])
                cellphone = CellphoneSerializer(data=request.data["cellphone"])
                address = AddressSerializer(data=request.data["address"])
                person = PersonSerializer(data=request.data["person"])

                if (
                    user.is_valid()
                    and cellphone.is_valid()
                    and address.is_valid()
                    and person.is_valid()
                ):
                    user = User(
                        first_name=user.data["first_name"],
                        last_name=user.data["last_name"],
                        email=user.data["email"],
                        type="P",
                    )
                    user.set_password(password)
                    user.save()

                    address = address.save()
                    cellphone = cellphone.save()

                    person = Person(
                        cpf=person.data["cpf"],
                        age=person.data["age"],
                        sex=person.data["sex"],
                        address=address,
                        cellphone=cellphone,
                        user=user,
                    )
                    person.save()

                    return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(csrf_protect, name="dispatch")
class Logout(APIView):
    def delete(self, request, format=None):
        """Logout"""

        try:
            logout(request)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        """Sets CSRF cookie"""

        return Response(status=status.HTTP_200_OK)


@method_decorator(csrf_protect, name="dispatch")
class Login(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """Login"""

        email = request.data["email"]
        password = request.data["password"]

        try:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)

                if user.type == "A":
                    serializer = AdminSerializer(user.admin)
                elif user.type == "P":
                    serializer = PersonSerializer(user.person)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(csrf_protect, name="dispatch")
class UseSession(APIView):
    def get(self, request, format=None):
        """Fetches the data on the current user logged in"""

        try:
            if not User.is_authenticated:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            if request.user.type == "A":
                serializer = AdminSerializer(request.user.admin)
            elif request.user.type == "P":
                serializer = PersonSerializer(request.user.person)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
