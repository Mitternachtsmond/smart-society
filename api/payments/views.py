from rest_framework import generics, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from .models import Maintenance, Transaction, Penalty
from .serializers import Maintenance_Serializer, Penalty_Serializer, Transaction_Serializer


class Transaction_Viewset(viewsets.ModelViewSet):
    serializer_class = Transaction_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["to", "option", "date", "amount", "description"]

    def get_queryset(self):
        return Transaction.objects.all()


class Maintenance_Viewset(viewsets.ModelViewSet):
    serializer_class = Maintenance_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ["month", "property_no__property_no__username"]

    def get_queryset(self):
        return Maintenance.objects.all()

    def put(self, request, *args, **kwargs):
        month = timezone.now().month
        year = timezone.now().year
        row = Maintenance.objects.get(
            property_no=request.data['property_no'], month__month=month, month__year=year)
        row.amount_paid += int(request.data['amount'])
        row.save()
        return Response({'status': 'Payment Done'})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def total_funds(request):
    funds = 0
    for transaction in Transaction.objects.all():
        if transaction.option == "paid":
            funds -= transaction.amount
        else:
            funds += transaction.amount
    return Response({"funds": funds})


class PenaltyAPI(generics.GenericAPIView):
    def get_queryset(self):
        return Penalty.objects.all()

    def get_serializer_class(self):
        return Penalty_Serializer

    def get(self, request):
        penalty = Penalty.objects.get().penalty
        return Response({"penalty": penalty})

    def put(self, request):
        row = Penalty.objects.get()
        if row.penalty != int(request.data["penalty"]):
            row.penalty = request.data["penalty"]
            row.save()
        return Response({"penalty": row.penalty})
