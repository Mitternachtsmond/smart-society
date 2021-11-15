from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination

from .models import Personal_Staff, Society_Staff
from .serializers import Personal_Staff_Serializer, Society_Staff_Serializer


class Personal_Staff_Viewset(viewsets.ModelViewSet):
    serializer_class = Personal_Staff_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["s_no", "name", "occupation"]

    def get_queryset(self):
        return Personal_Staff.objects.all()


class Society_Staff_Viewset(viewsets.ModelViewSet):
    serializer_class = Society_Staff_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["occupation__username", "name"]

    def get_queryset(self):
        return Society_Staff.objects.all()
