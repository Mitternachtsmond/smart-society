from rest_framework import serializers

from .models import Maintenance, Transaction


class Transaction_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


class Maintenance_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = "__all__"
