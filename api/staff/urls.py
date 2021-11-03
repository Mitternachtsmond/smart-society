from django.db import router
from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter

from .views import Personal_Staff_Viewset, Society_Staff_Viewset

router = DefaultRouter()
router.register(r"personal_staff", Personal_Staff_Viewset, "personal_staff")
router.register(r"society_staff", Society_Staff_Viewset, "society_staff")

urlpatterns = [path("", include(router.urls))]
