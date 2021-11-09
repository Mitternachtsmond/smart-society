from rest_framework import serializers, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Announcement, Inventory, Property_Info
from .serializers import (
    Announcement_PartialSerializer,
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

    def create(self, request):
        if request.user.groups.first() and request.user.groups.first().id < 3:
            category = "Complaint"
            if request.user.groups.first().id == 1:
                category = "Notification"
            serializer = Announcement_PartialSerializer(
                data=request.data)
            if serializer.is_valid():
                serializer.save(category=category,
                                author=request.user.username)
                return Response(serializer.data)
            return Response({'status': 'error'})

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return Announcement_Serializer
        return Announcement_PartialSerializer
