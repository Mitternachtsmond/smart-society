from django.db import router
from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter
from .views import Maintenance_Viewset, Penalty_Rate, Transaction_Viewset, total_funds, payMaintenance

router = DefaultRouter()
router.register(r"transactions", Transaction_Viewset, "transaction")
router.register(r"maintenance", Maintenance_Viewset, "maintenance")

urlpatterns = [
    path("", include(router.urls)),
    path("funds/", total_funds),
    path("penalty_rate/", Penalty_Rate.as_view()),
    path("pay/", payMaintenance)
]
