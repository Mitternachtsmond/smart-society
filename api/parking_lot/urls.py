from django.db import router
from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter

from .views import Gate_Log_Viewset, Parking_Viewset

router = DefaultRouter()
router.register(r"parking", Parking_Viewset, "parking")
router.register(r"gate_log", Gate_Log_Viewset, "gate_log")

urlpatterns = [path("", include(router.urls))]
