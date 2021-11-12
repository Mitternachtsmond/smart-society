from django.db import router
from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter
from .views import Maintenance_Viewset, PenaltyAPI, Transaction_Viewset, total_funds

router = DefaultRouter()
router.register(r"transactions", Transaction_Viewset, "transaction")
router.register(r"maintenance", Maintenance_Viewset, "maintenance")

urlpatterns = [
    path("", include(router.urls)),
    path("funds/", total_funds),
    path("penalty/", PenaltyAPI.as_view()),
]
