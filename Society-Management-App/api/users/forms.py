from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import Account


class AccountCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = Account
        fields = ("username",)


class AccountChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = Account
        fields = ("username", "password", "is_active", "is_admin", "is_staff")
