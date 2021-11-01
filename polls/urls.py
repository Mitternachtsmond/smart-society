from django.urls import path
from . import views

app_name = 'polls' #namespace
urlpatterns = [
    path('', views.Polls.as_view(), name='home'),
    path('vote/<int:poll_id>', views.Vote.as_view(), name='vote'),
    path('announcements/', views.Announcements.as_view(), name='announcements'),
]