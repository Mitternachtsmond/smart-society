from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.utils.encoding import smart_str, smart_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import generics, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
)
from .authentication import token_expire_handler
from .email import send_email
from .models import Account, Member
from .serializers import (
    Account_Serializer,
    Change_Password_Serializer,
    Login_Serializer,
    Member_Serializer,
    Registration_Serializer,
    Reset_Password_Serializer,
    Set_Password_Serializer,
)


class Registration_View(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = Registration_Serializer


class Account_List(generics.ListAPIView):
    filter_backends = (SearchFilter, OrderingFilter)
    pagination_class = PageNumberPagination
    search_fields = "username"
    queryset = Account.objects.all()
    serializer_class = Account_Serializer


class Account_Update(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "username"
    queryset = Account.objects.all()
    serializer_class = Account_Serializer


class Member_Viewset(viewsets.ModelViewSet):
    serializer_class = Member_Serializer
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ("property_no", "name")

    def get_queryset(self):
        return Member.objects.all()


@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    login_serializer = Login_Serializer(data=request.data)
    if not login_serializer.is_valid():
        return Response(login_serializer.errors, status=HTTP_400_BAD_REQUEST)

    user = authenticate(
        username=login_serializer.data["username"],
        password=login_serializer.data["password"],
    )
    if not user:
        return Response(
            {"detail": "Invalid Credentials"},
            status=HTTP_404_NOT_FOUND,
        )

    token, _ = Token.objects.get_or_create(user=user)

    is_expired, token = token_expire_handler(token)

    return Response(
        {
            "token": token.key,
        },
        status=HTTP_200_OK,
    )


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def logout(request):
    token = request.headers["Authorization"].split()[1]
    user = Token.objects.get(key=token).user
    Token.objects.filter(key=token).first().delete()
    Token.objects.create(user=user)

    return Response("Logged Out successfully")


class Change_Password_View(generics.UpdateAPIView):
    serializer_class = Change_Password_Serializer
    model = Account
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            if not self.object.check_password(
                serializer.validated_data.get("old_password")
            ):
                return Response(
                    {"old_password": ["Wrong password. Enter Correct Password"]},
                    status=HTTP_400_BAD_REQUEST,
                )
            new_password = serializer.validated_data.get("new_password1")
            try:
                validate_password(new_password)
                self.object.set_password(new_password)
                self.object.save()
                response = {
                    "message": "Password updated successfully",
                }

                return Response(response)
            except ValidationError as exception:
                response = {"messages": exception.messages}
                return Response(response, status=HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class Reset_Password(generics.CreateAPIView):
    serializer_class = Reset_Password_Serializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data.get("email", "")

            if Account.objects.filter(email=email).exists():
                user = Account.objects.get(email=email)
                uidb64 = urlsafe_base64_encode(smart_bytes(user.username))
                token = PasswordResetTokenGenerator().make_token(user)
                current_site = get_current_site(request=request).domain
                relative_link = reverse(
                    "reset_password", kwargs={"uidb64": uidb64, "token": token}
                )
                absurl = "http://" + current_site + relative_link
                email_body = (
                    "Hello "
                    + str(user)
                    + ",\n\n"
                    + "A request has been received to reset the password for your Smart Society Account.\n"
                    + "Use the link below to reset your password.\n\n"
                    + absurl
                    + "\n\nIf you have not initiated this request, you can safely ignore this mail.\n\n"
                    + "Thank you,\n"
                    + "The Smart Society Team"
                )
                data = {
                    "email_body": email_body,
                    "to_email": [user.email],
                    "email_subject": "Reset your passsword",
                }

                send_email(data)
                return Response(
                    {"success": "We have sent you a link to reset your password"},
                    status=HTTP_200_OK,
                )
            return Response(
                {"failed": "Email not found, try a different email."},
                status=HTTP_400_BAD_REQUEST,
            )

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class Password_Token_API(generics.ListAPIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):

        try:
            username = smart_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(username=username)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {
                        "error": "URL is not valid, either check your URL or request for a new one."
                    },
                    status=HTTP_401_UNAUTHORIZED,
                )

            return Response(
                {
                    "success": True,
                    "message": "Valid Credentials",
                    "uidb64": uidb64,
                    "token": token,
                }
            )

        except:

            return Response(
                {
                    "error": "URL is not valid, either check your URL or request for a new one."
                }
            )


class Set_Password_API(generics.GenericAPIView):
    serializer_class = Set_Password_Serializer
    permission_classes = [AllowAny]

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            return Response(
                {"success": True, "message": "Password reset success"},
                status=HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
