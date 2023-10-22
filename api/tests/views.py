from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.request import Request
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import Result, Life, LoveLanguage, Mbti, SelfKnowledge
from .filters import (
    LifeFilter,
    LoveLanguageFilter,
    SelfKnowledgeFilter,
    MbtiFilter,
    ResultFilter,
)
from .serializers import (
    LifeSerializer,
    LoveLanguageSerializer,
    SelfKnowledgeSerializer,
    MbtiSerializer,
    ResultSerializer,
)
from clinic.models import Clinic


class ResultViews(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    filterset_class = ResultFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]

    def create_result(self, request: Request, *args, **kwargs) -> Response:
        try:
            result = request.data.get("result")
            if not result:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            with transaction.atomic():
                if result["test"] == "MB":
                    mbti = MbtiSerializer(data=request.data.get("mbti"))
                    if mbti.is_valid():
                        mbti.save()
                if result["test"] == "SK":
                    sk = SelfKnowledge(data=request.data.get("sk"))
                    if sk.is_valid():
                        sk.save()
                if result["test"] == "LO":
                    ll = LoveLanguageSerializer(data=request.data.get("ll"))
                    if ll.is_valid():
                        ll.save()
                if result["test"] == "life":
                    life = LifeSerializer(data=request.data.get("life"))
                    if life.is_valid():
                        life.save()
                instance = Result.objects.get(id=result.pop("id"))
                updated_result = ResultSerializer(
                    instance, data={**result}, partial=True
                )
                if updated_result.is_valid(raise_exception=True):
                    updated_result.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LifeViews(viewsets.ModelViewSet):
    queryset = Life.objects.all()
    serializer_class = LifeSerializer
    filterset_class = LifeFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]


class MbtiViews(viewsets.ModelViewSet):
    queryset = Mbti.objects.all()
    serializer_class = MbtiSerializer
    filterset_class = MbtiFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]


class LoveLanguageViews(viewsets.ModelViewSet):
    queryset = LoveLanguage.objects.all()
    serializer_class = LoveLanguageSerializer
    filterset_class = LoveLanguageFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]


class SelfKnowledgeViews(viewsets.ModelViewSet):
    queryset = SelfKnowledge.objects.all()
    serializer_class = SelfKnowledgeSerializer
    filterset_class = SelfKnowledgeFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]
