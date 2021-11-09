from django.urls import path
from .views import Polls, Polls_Result, Vote

urlpatterns = [
    path("", Polls.as_view()),
    path("<int:s_no>", Polls_Result.as_view()),
    path("vote/<int:s_no>", Vote.as_view()),
]
