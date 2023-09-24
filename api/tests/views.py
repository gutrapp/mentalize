from rest_framework import viewsets
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import Result, Life, LoveLanguage, Mbti, SelfKnowledge
from .filters import ResultFilter
from .serializers import (
    LifeSerializer,
    LoveLanguageSerializer,
    SelfKnowledgeSerializer,
    MbtiSerializer,
    ResultSerializer,
)


class ResultViews(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    filterset_class = ResultFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]


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
