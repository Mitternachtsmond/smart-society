from django.contrib import admin
from users.models import Member

from .models import (
    Announcement,
    Inventory,
    Property_Info,
)


class Member_Inline(admin.StackedInline):
    model = Member


class Property_Info_Admin(admin.ModelAdmin):
    model = Property_Info
    ordering = ("property_type",)
    search_fields = ("property_type",)
    list_display = ("property_type", "maintenance", "covered_area")
    list_filter = ()
    filter_horizontal = ()

    fieldsets = ((None, {"fields": ("property_type", "maintenance", "covered_area")}),)

    inlines = [Member_Inline]


class Inventory_Admin(admin.ModelAdmin):
    model = Inventory
    ordering = ("item",)
    search_fields = ("item",)
    list_display = ("item", "quantity")
    list_filter = ()
    filter_horizontal = ()

    fieldsets = ((None, {"fields": ("item", "quantity")}),)


class Announcement_Admin(admin.ModelAdmin):
    model = Announcement
    ordering = ("-date",)
    search_fields = ("author",)
    list_display = ("date", "author", "category")
    list_filter = ("category",)
    filter_horizontal = ()

    fieldsets = ((None, {"fields": ("author", "category", "description")}),)


admin.site.register(Property_Info, Property_Info_Admin)
admin.site.register(Inventory, Inventory_Admin)
admin.site.register(Announcement, Announcement_Admin)
