from django.contrib import admin
from .models import Personal_Staff, Society_Staff


class Personal_Staff_Admin(admin.ModelAdmin):
    model = Personal_Staff
    ordering = ("s_no",)
    search_fields = ("name",)
    list_display = ("name", "occupation", "image_preview")
    list_filter = ("occupation",)
    filter_horizontal = ()
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        return obj.image_preview

    image_preview.short_description = "Image Preview"
    image_preview.allow_tags = True

    fieldsets = ((None, {"fields": ("name", "occupation", "image", "image_preview")}),)


class Society_Staff_Admin(admin.ModelAdmin):
    model = Society_Staff
    ordering = ("occupation",)
    search_fields = ("name", "occupation")
    list_display = ("name", "occupation", "salary", "work_place", "image_preview")
    list_filter = ("work_place",)
    filter_horizontal = ()
    readonly_fields = ("image_preview",)

    def image_preview(self, obj):
        return obj.image_preview

    image_preview.short_description = "Image Preview"
    image_preview.allow_tags = True
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "occupation",
                    "aadhaar",
                    "name",
                    "salary",
                    "work_place",
                    "from_place",
                    "mobile_no",
                    "image",
                    "image_preview",
                )
            },
        ),
    )


admin.site.register(Personal_Staff, Personal_Staff_Admin)
admin.site.register(Society_Staff, Society_Staff_Admin)
