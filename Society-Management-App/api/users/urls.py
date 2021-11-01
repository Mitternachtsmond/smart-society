from django.db import router
from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter

from .views import Member_Viewset, Account_List, Account_Update


router = DefaultRouter()
router.register(r"members", Member_Viewset, "member")


urlpatterns = [
    path("", include(router.urls)),
    path("accounts/", Account_List.as_view()),
    path("accounts/<str:username>", Account_Update.as_view()),
]
