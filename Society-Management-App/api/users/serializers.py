from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import force_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers

from .models import Account, Member


class Registration_Serializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        label="Password", style={"input_type": "password"}, write_only=True
    )
    password2 = serializers.CharField(
        label="Confirm Password", style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = Account
        fields = ("username", "email", "password1", "password2", "groups")

    def save(self):
        account = Account(
            username=self.validated_data["username"], email=self.validated_data["email"]
        )
        password1 = self.validated_data["password1"]
        password2 = self.validated_data["password2"]

        if password1 != password2:
            raise serializers.ValidationError({"password": "Passwords should match"})

        account.set_password(password1)
        account.save()
        account.groups.set(self.validated_data["groups"])

        return account


class Account_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"


class Member_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = "__all__"


class Login_Serializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        fields = ["username", "password"]


class Change_Password_Serializer(serializers.Serializer):
    old_password = serializers.CharField(
        label="Old Password", style={"input_type": "password"}, write_only=True
    )
    new_password1 = serializers.CharField(
        label="New Password", style={"input_type": "password"}, write_only=True
    )
    new_password2 = serializers.CharField(
        label="Confirm Password", style={"input_type": "password"}, write_only=True
    )

    def is_valid(self, raise_exception=True):

        validity = super(Change_Password_Serializer, self).is_valid(
            raise_exception=raise_exception
        )
        if validity:
            password1 = self.validated_data["new_password1"]
            password2 = self.validated_data["new_password2"]
            if password1 != password2:
                raise serializers.ValidationError(
                    {"password": "Passwords should match"}
                )
        return validity

    class Meta:
        fields = ["old_password", "new_password1", "new_password2"]


class Reset_Password_Serializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ["email"]


class Set_Password_Serializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, style={"input_type": "password"}, write_only=True, required=True
    )
    token = serializers.CharField(min_length=1, write_only=True, required=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True, required=True)

    class Meta:
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            username = force_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(username=username)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ObjectDoesNotExist({"error": "The Reset Link is invalid"})

            validate_password(password)
            user.set_password(password)
            user.save()

            return user

        except (ObjectDoesNotExist, DjangoUnicodeDecodeError):
            raise serializers.ValidationError({"error": "The Reset Link is invalid"})
