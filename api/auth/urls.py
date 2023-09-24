from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import (
    PersonViews,
    LogoutPerson,
    RegisterPerson,
    LoginPerson,
    UseSessionPerson,
    LogoutAdmin,
    GetCSRFTokenAdmin,
    LoginAdmin,
    UseSessionAdmin,
)


router = SimpleRouter(trailing_slash=False)

router.register(r"person", PersonViews, basename="person")

urlpatterns = [
    path("auth/logout/person", LogoutPerson.as_view()),
    path("auth/register/person", RegisterPerson.as_view()),
    path("auth/login/person", LoginPerson.as_view()),
    path("auth/session/person", UseSessionPerson.as_view()),
    path("auth/logout/admin", LogoutAdmin.as_view()),
    path("auth/csrf/admin", GetCSRFTokenAdmin.as_view()),
    path("auth/login/admin", LoginAdmin.as_view()),
    path("auth/session/admin", UseSessionAdmin.as_view()),
]
