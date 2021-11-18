"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from users.views import (
    Change_Password_View,
    Password_Token_API,
    Registration_View,
    Reset_Password,
    Set_Password_API,
    login,
    logout,
)

api_patterns = [
    path("users/", include("users.urls")),
    path("society_info/", include("society_info.urls")),
    path("staff/", include("staff.urls")),
    path("parking_lot/", include("parking_lot.urls")),
    path("payments/", include("payments.urls")),
    path("polls/", include("polls.urls")),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("register/", Registration_View.as_view()),
    path("login/", login),
    path("logout/", logout),
    path("change_password/", Change_Password_View.as_view()),
    path(
        "reset_password_email/",
        Reset_Password.as_view(),
        name="reset_password_email",
    ),
    path(
        "reset_password/<uidb64>/<token>",
        Password_Token_API.as_view(),
        name="reset_password",
    ),
    path("reset_password_complete/", Set_Password_API.as_view(), name="reset_password_complete"),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(api_patterns)),
]

# if settings.DEBUG:
urlpatterns += (static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))
urlpatterns += (static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))

admin.site.site_header = "Smart Society Admin"
admin.site.site_title = "Smart Society Admin Portal"
admin.site.index_title = "Welcome to Portal"