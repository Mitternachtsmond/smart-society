from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination

from .models import Gate_Log, Parking
from .serializers import Gate_Log_Serializer, Parking_Serializer


class Parking_Viewset(viewsets.ModelViewSet):
    serializer_class = Parking_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["parking_id", "property_no__property_no__username"]

    def get_queryset(self):
        return Parking.objects.all()


class Gate_Log_Viewset(viewsets.ModelViewSet):
    serializer_class = Gate_Log_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["s_no", "parking_id__parking_id", "name",
                     "property_no__property_no__username", "vehicle_type"]

    def get_queryset(self):
        return Gate_Log.objects.all()
