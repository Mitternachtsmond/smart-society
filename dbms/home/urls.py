
from django.urls import path
from .views import Society_Staff_APIView,Personal_Staff_APIView,SocietyStaffDetailAPIView,PersonalStaffDetailAPIView

urlpatterns = [
    path('pS/',Personal_Staff_APIView.as_view()),
    path('sS/',Society_Staff_APIView.as_view()),
    path('pS/<int:pk>',PersonalStaffDetailAPIView.as_view()),
    path('sS/<int:pk>',SocietyStaffDetailAPIView.as_view()),
    # path('photos/Society/<str:img>',SocietyStaffDetailPhotoAPIView)
]