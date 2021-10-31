from django.db import models
from rest_framework import fields, serializers
from .models import gate_log,parking

class ParkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = parking
        fields = '__all__'

class GatelogSerializer(serializers.ModelSerializer):
    class Meta:
        model = gate_log
        fields = '__all__'

        