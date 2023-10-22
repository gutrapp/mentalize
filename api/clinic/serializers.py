from rest_framework import serializers

from .models import Clinic, Address, Cellphone


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class CellphoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cellphone
        fields = "__all__"


class ClinicSerializer(serializers.ModelSerializer):
    address = AddressSerializer(allow_null=True)
    cellphone = CellphoneSerializer(allow_null=True)

    class Meta:
        model = Clinic
        fields = "__all__"
