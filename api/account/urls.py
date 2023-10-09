from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import (
    PersonViews,
    UserViews,
    RegisterPerson,
    Login,
    Logout,
    GetCSRFToken,
    UseSession,
)


router = SimpleRouter(trailing_slash=False)

router.register(r"person", PersonViews, basename="person")
router.register(r"user", UserViews, basename="person")

urlpatterns = [
    path("auth/csrf", GetCSRFToken.as_view()),
    path("auth/logout", Logout.as_view()),
    path("auth/session", UseSession.as_view()),
    path("auth/login", Login.as_view()),
    path("auth/register", RegisterPerson.as_view()),
]
