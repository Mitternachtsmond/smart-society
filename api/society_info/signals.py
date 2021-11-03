from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from .models import Announcement, Inventory, Property_Info


@receiver(post_save, sender=Property_Info)
def save_property_info(sender, instance, created, **kwargs):
    if created:
        description = (
            "New Property Information record was created.\nProperty Type = %s\nMaintenance = %s\nCovered_Area = %s"
            % (instance.property_type, instance.maintenance, instance.covered_area)
        )
    else:
        description = (
            "Property Information record updated to.\nProperty Type = %s\nMaintenance = %s\nCovered_Area = %s"
            % (instance.property_type, instance.maintenance, instance.covered_area)
        )
    Announcement.objects.create(
        author="Admin",
        category="Notification",
        description=description,
    )


@receiver(pre_delete, sender=Property_Info)
def delete_property_info(sender, instance, **kwargs):
    description = (
        "Property Information record was deleted.\nProperty Type = %s\nMaintenance = %s\nCovered_Area = %s"
        % (instance.property_type, instance.maintenance, instance.covered_area)
    )

    Announcement.objects.create(
        author="Admin",
        category="Notification",
        description=description,
    )


@receiver(post_save, sender=Inventory)
def save_inventory(sender, instance, created, **kwargs):
    if created:
        description = "New Inventory record was created.\nItem = %s\nQuantity = %s" % (
            instance.item,
            instance.quantity,
        )
    else:
        description = "Inventory record was updated to.\nItem = %s\nQuantity = %s" % (
            instance.item,
            instance.quantity,
        )
    Announcement.objects.create(
        author="Admin",
        category="Notification",
        description=description,
    )


@receiver(pre_delete, sender=Inventory)
def delete_inventory(sender, instance, **kwargs):
    description = "Inventory record was deleted.\nItem = %s\nQuantity = %s" % (
        instance.item,
        instance.quantity,
    )

    Announcement.objects.create(
        author="Admin",
        category="Notification",
        description=description,
    )
