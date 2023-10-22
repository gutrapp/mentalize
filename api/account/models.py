from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserManager
from clinic.models import Clinic, Address, Cellphone


class User(AbstractBaseUser, PermissionsMixin):
    PERSON = "P"
    ADMIN = "A"
    ROLE_CHOICES = [(PERSON, "Pessoa"), (ADMIN, "Administrador")]

    full_name = models.CharField(max_length=150)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    type = models.CharField(max_length=1, choices=ROLE_CHOICES)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"

    objects = UserManager()


class Admin(models.Model):
    GLOBAL = "G"
    CLINIC = "C"
    GROUP_CHOICES = [
        (GLOBAL, "Global"),
        (CLINIC, "Clínica"),
    ]

    ADMIN = "A"
    OPERATOR = "O"
    ROLE_CHOICES = [
        (ADMIN, "Administrador"),
        (OPERATOR, "Operador"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="admin")
    group = models.CharField(max_length=2, choices=GROUP_CHOICES)
    role = models.CharField(max_length=2, choices=ROLE_CHOICES)
    clinic = models.ManyToManyField(Clinic, blank=True)


class Person(models.Model):
    MALE = "M"
    FEMALE = "F"
    SEX_CHOICES = [
        (MALE, "Masculino"),
        (FEMALE, "Feminino"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="person")
    cpf = models.CharField(max_length=11, unique=True)
    age = models.IntegerField()
    sex = models.CharField(max_length=2, choices=SEX_CHOICES)
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, null=True)
    cellphone = models.OneToOneField(Cellphone, on_delete=models.SET_NULL, null=True)
