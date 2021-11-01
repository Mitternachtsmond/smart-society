from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from parking_lot.models import Parking

from .forms import AccountChangeForm, AccountCreationForm
from .models import Account, Member


class Member_Inline(admin.StackedInline):
    model = Member


class Parking_Inline(admin.StackedInline):
    model = Parking


class AccountAdmin(UserAdmin):
    form = AccountChangeForm
    add_form = AccountCreationForm
    model = Account

    ordering = ("username",)
    search_fields = ("username",)
    list_display = ("username", "email", "date_joined")
    list_filter = ("groups",)

    filter_horizontal = ()
    readonly_fields = ("date_joined", "last_login")
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            "Permissions",
            {"fields": ("groups",)},
        ),
        ("Important Dates", {"fields": ("date_joined", "last_login")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "email", "password1", "password2", "groups"),
            },
        ),
    )

    inlines = [Member_Inline]


class Member_Admin(admin.ModelAdmin):
    model = Member
    ordering = ("property_no",)
    search_fields = ("property_no__username",)
    list_display = ("property_no", "property_type", "name", "mobile_no")
    list_filter = ("property_type",)
    filter_horizontal = ()

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "property_no",
                    "property_type",
                    "name",
                    "mobile_no",
                    "tenant_name",
                    "tenant_mobile",
                )
            },
        ),
    )
    inlines = [Parking_Inline]


admin.site.register(Account, AccountAdmin)
admin.site.register(Member, Member_Admin)
