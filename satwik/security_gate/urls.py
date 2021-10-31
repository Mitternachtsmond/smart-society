from django.urls import path
from django.urls.conf import include
from . import views

urlpatterns =[
    path('', views.pending_entry, name='home'),
    path('register/',views.register_entry, name='register'),
    path('exit/', views.exit,name='exit'),
    path('create/',views.create_parking),
    path('gate_log/', views.gate_log_api.as_view())
]