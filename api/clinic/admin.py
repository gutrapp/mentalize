from django.contrib import admin

from .models import Clinic, Cellphone, Address


admin.site.register(Clinic)
admin.site.register(Cellphone)
admin.site.register(Address)
