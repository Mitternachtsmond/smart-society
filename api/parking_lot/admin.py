from django.contrib import admin

from .models import Gate_Log, Parking


class Parking_Admin(admin.ModelAdmin):
    model = Parking
    ordering = ("parking_id",)
    search_fields = ("parking_id", "property_no_id__property_no_id__username")
    list_display = ("parking_id", "property_no")
    list_filter = ()
    filter_horizontal = ()
    readonly_fields = ("filled",)

    fieldsets = ((None, {"fields": ("parking_id", "property_no")}),)


class Gate_Log_Admin(admin.ModelAdmin):
    model = Gate_Log
    ordering = ("-entry_time", "-exit_time")
    search_fields = ("parking_id_id__parking_id", "name", "property_no_id__property_no_id__username")
    list_display = ("name", "entry_time", "exit_time", "parking_id")
    list_filter = ("vehicle_type",)
    filter_horizontal = ()
    readonly_fields = ("parking_id", "entry_time", "exit_time")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "name",
                    "property_no",
                    "entry_time",
                    "exit_time",
                    "exited",
                    "vehicle_type",
                    "vehicle_number",
                    "parking_id",
                )
            },
        ),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ["parking_id", "entry_time", "exit_time", "name", "property_no", "vehicle_type", "vehicle_number"]
        else:
            return ["parking_id", "entry_time", "exit_time"]


admin.site.register(Parking, Parking_Admin)
admin.site.register(Gate_Log, Gate_Log_Admin)
