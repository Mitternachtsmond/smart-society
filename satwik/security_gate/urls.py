from django.urls import path
from django.urls.conf import include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('parking', views.ParkingView)


urlpatterns =[
    path('', views.pending_entry, name='home'),
    path('register/',views.register_entry, name='register'),
    path('exit/', views.exit,name='exit'),
    path('create/',views.create_parking),
    path('api/', include(router.urls)),
]