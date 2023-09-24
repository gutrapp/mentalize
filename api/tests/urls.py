from rest_framework.routers import SimpleRouter
from django.urls import path

from .views import (
    MbtiViews,
    LifeViews,
    LoveLanguageViews,
    SelfKnowledgeViews,
    ResultViews,
)


router = SimpleRouter(trailing_slash=False)

router.register(r"mbti", MbtiViews, basename="mbti")
router.register(r"life", LifeViews, basename="life")
router.register(r"lovelanguage", LoveLanguageViews, basename="lovelanguage")
router.register(r"selfknowledge", SelfKnowledgeViews, basename="selfknowledge")
router.register(r"result", ResultViews, basename="result")

urlpatterns = []
