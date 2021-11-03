from rest_framework import serializers

from .models import Announcement, Inventory, Property_Info


class Property_Info_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Property_Info
        fields = "__all__"


class Inventory_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = "__all__"


class Announcement_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = "__all__"
