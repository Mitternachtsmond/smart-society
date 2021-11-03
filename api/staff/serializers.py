from rest_framework import serializers

from .models import Personal_Staff, Society_Staff


class Personal_Staff_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Personal_Staff
        fields = "__all__"


class Society_Staff_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Society_Staff
        fields = "__all__"
