from rest_framework import serializers

from .models import Gate_Log, Parking


class Parking_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Parking
        fields = "__all__"


class Gate_Log_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Gate_Log
        fields = "__all__"
