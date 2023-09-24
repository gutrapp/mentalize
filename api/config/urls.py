from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from auth.urls import router as auth_router
from clinic.urls import router as clinic_router
from tests.urls import router as tests_router
from auth.urls import urlpatterns as auth_router

routes = []
routes.extend(auth_router.urls)
routes.extend(clinic_router.urls)
routes.extend(tests_router.urls)
routes.extend(tests_router.urls)
routes.extend(auth_router)


urlpatterns = [path("admin/", admin.site.urls), path("api/", include(routes))]

urlpatterns += staticfiles_urlpatterns()
