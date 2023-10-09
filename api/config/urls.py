from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from account.urls import router as account_router
from clinic.urls import router as clinic_router
from tests.urls import router as tests_router
from account.urls import urlpatterns as account_urls

routes = []
routes.extend(account_router.urls)
routes.extend(clinic_router.urls)
routes.extend(tests_router.urls)
routes.extend(tests_router.urls)
routes.extend(account_urls)


urlpatterns = [path("admin/", admin.site.urls), path("api/", include(routes))]

urlpatterns += staticfiles_urlpatterns()
