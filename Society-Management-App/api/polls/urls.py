from django.urls import path
from .views import Polls, Polls_Result, Vote

urlpatterns = [
    path("decisions/", Polls.as_view()),
    path("decisions/<int:s_no>", Polls_Result.as_view()),
    path("vote/<int:poll_id>", Vote.as_view()),
]
