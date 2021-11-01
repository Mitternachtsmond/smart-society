from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination

from .models import Announcement, Inventory, Property_Info
from .serializers import (
    Announcement_Serializer,
    Inventory_Serializer,
    Property_Info_Serializer,
)


class Property_Info_Viewset(viewsets.ModelViewSet):
    serializer_class = Property_Info_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["maintenance", "property_type", "covered_area"]

    def get_queryset(self):
        return Property_Info.objects.all()


class Inventory_Viewset(viewsets.ModelViewSet):
    serializer_class = Inventory_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["item"]

    def get_queryset(self):
        return Inventory.objects.all()


class Announcement_Viewset(viewsets.ModelViewSet):
    serializer_class = Announcement_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["s_no", "author", "category"]

    def get_queryset(self):
        return Announcement.objects.all()
