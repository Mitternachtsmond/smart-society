from django.db import router
from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter

from .views import Announcement_Viewset, Inventory_Viewset, Property_Info_Viewset

router = DefaultRouter()
router.register(r"properties", Property_Info_Viewset, "property_info")
router.register(r"inventory", Inventory_Viewset, "inventory")
router.register(r"announcements", Announcement_Viewset, "announcement")

urlpatterns = [
    path("", include(router.urls)),
]
