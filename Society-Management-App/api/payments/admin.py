from django.contrib import admin

from .models import Maintenance, Transaction


class Transaction_Admin(admin.ModelAdmin):
    model = Transaction
    ordering = ("-date", "amount")
    search_fields = ("to",)
    list_display = ("to", "date", "option", "amount")
    list_filter = ("option",)
    filter_horizontal = ()

    fieldsets = ((None, {"fields": ("date", "amount", "option", "to", "description")}),)


class Maintenance_Admin(admin.ModelAdmin):
    model = Maintenance
    ordering = ("-month", "property_no")
    search_fields = ("property_no_id__property_no_id__username",)
    list_display = (
        "property_no",
        "month",
        "amount_basic",
        "amount_paid",
        "amount_penalty",
        "amount_due",
    )
    list_filter = ("month",)
    filter_horizontal = ()
    readonly_fields = ("property_no", "amount_penalty", "amount_due")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "property_no",
                    "amount_basic",
                    "amount_paid",
                    "amount_penalty",
                    "amount_due",
                )
            },
        ),
    )

admin.site.register(Transaction, Transaction_Admin)
admin.site.register(Maintenance, Maintenance_Admin)