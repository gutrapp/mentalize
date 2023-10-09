from django.contrib import admin


from .models import Person, Admin, User


admin.site.register(Person)
admin.site.register(Admin)
admin.site.register(User)
