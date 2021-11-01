from django.http.response import JsonResponse
from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from society_info.models import Announcement

from .models import PENALTY_RATE, Maintenance, Transaction
from .serializers import Maintenance_Serializer, Transaction_Serializer


class Transaction_Viewset(viewsets.ModelViewSet):
    serializer_class = Transaction_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["to", "s_no"]

    def get_queryset(self):
        return Transaction.objects.all()


class Maintenance_Viewset(viewsets.ModelViewSet):
    serializer_class = Maintenance_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["month", "property_no"]

    def get_queryset(self):
        return Maintenance.objects.all()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def total_funds(request):
    funds = 0
    for transaction in Transaction.objects.all():
        if transaction.option == "paid":
            funds -= transaction.amount
        else:
            funds += transaction.amount
    response = {"funds": funds}
    return JsonResponse(response)


class Penalty_Rate(generics.GenericAPIView):
    def get_queryset(self):
        return Maintenance.objects.all()

    global PENALTY_RATE

    def get(self, request):
        return JsonResponse({"penalty rate": PENALTY_RATE})

    def put(self, request):
        PENALTY_RATE = request.data["penalty rate"]
        Announcement.objects.create(
            author="Admin",
            category="Notification",
            description="The Penalty Rate has been changed to %d" % (PENALTY_RATE),
        )
        return JsonResponse({"penalty rate": PENALTY_RATE})
