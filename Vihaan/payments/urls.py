from django.urls import path, include
from .views import *
from rest_framework import routers
router = routers.DefaultRouter()
router.register('maintenance', MaintenanceViewSet, basename="maintenance")
router.register('transaction', TransactionViewSet, basename="transaction")


urlpatterns = [
    path('', home, name="home"),
    path('maintenance/', maintenance, name="maintenance"),
    path('transactions/', transactions, name="transactions"),
    path('maintenance/pay/', pay, name="pay"),
    path('viewset/', include(router.urls)),
    path('maintenance/penaltyRate/', penaltyRate, name="penaltyRate"),
    path('funds/', funds, name="funds"),
]