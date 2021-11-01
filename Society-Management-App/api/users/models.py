from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from society_info.models import Property_Info
from django.utils.translation import ugettext_lazy as _


class AccountManager(BaseUserManager):
    def create_user(self, username, email, password, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        if not (username):
            raise ValueError("User must have Property Number or Occupation")
        if not (email):
            raise ValueError("User must have an email")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)


class Account(AbstractBaseUser, PermissionsMixin):

    username = models.CharField(
        verbose_name=_("Property Address or Staff Occupation"),
        max_length=25,
        primary_key=True,
    )
    email = models.EmailField(verbose_name="Email", max_length=60, unique=True)
    date_joined = models.DateTimeField(_("Joined On"), auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]
    EMAIL_FIELD = "email"
    
    objects = AccountManager()

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Account"
        verbose_name_plural = "Accounts"
        ordering = ["username"]


class Member(models.Model):
    property_no = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        verbose_name=_("Property No."),
    )
    property_type = models.ForeignKey(
        Property_Info,
        on_delete=models.CASCADE,
        null=True,
        verbose_name=_("Property Type"),
    )
    name = models.CharField(_("Name"), max_length=50)
    mobile_no = models.CharField(_("Mobile No."), max_length=50)
    tenant_name = models.CharField(
        _("Tenant Name"), max_length=50, null=True, blank=True
    )
    tenant_mobile = models.CharField(
        _("Tenant Mobile No."), max_length=10, null=True, blank=True
    )

    def save(self, *args, **kwargs):
        if not self.tenant_name:
            self.tenant_name = None
        if not self.tenant_mobile:
            self.tenant_mobile = None
        super(Member, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.property_no)

    class Meta:
        ordering = ["property_no"]


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
