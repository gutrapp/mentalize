from rest_framework import serializers

from .models import Person, Admin, User
from clinic.serializers import CellphoneSerializer, AddressSerializer, ClinicSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class AdminSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, allow_null=True)
    clinic = ClinicSerializer(read_only=True, allow_null=True, many=True)

    class Meta:
        model = Admin
        fields = "__all__"


class PersonSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, allow_null=True)
    address = AddressSerializer(read_only=True, allow_null=True)
    cellphone = CellphoneSerializer(read_only=True, allow_null=True)

    class Meta:
        model = Person
        fields = "__all__"
