from rest_framework import viewsets, status
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Clinic, Address, Cellphone
from .filters import ClinicFilter, AddressFilter, CellphoneFilter
from .serializers import ClinicSerializer, AddressSerializer, CellphoneSerializer


class ClinicViews(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer
    filterset_class = ClinicFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]

    @action(detail=False, methods=["GET"], name="Get admin clinics")
    def admin_clinics(self, request, *args, **kwargs):
        try:
            user = request.user
            serializer = ClinicSerializer(user.admin.clinic.all(), many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddressViews(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    filterset_class = AddressFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]


class CellphoneViews(viewsets.ModelViewSet):
    queryset = Cellphone.objects.all()
    serializer_class = CellphoneSerializer
    filterset_class = CellphoneFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]
