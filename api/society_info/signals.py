from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from .models import Announcement, Inventory, Property_Info


@receiver(post_save, sender=Property_Info)
def save_property_info(sender, instance, created, **kwargs):
    changed_property_type = (
        instance.property_type != instance._Property_Info__original_property_type
    )
    changed_maintenance = (
        instance.maintenance != instance._Property_Info__original_maintenance
    )
    changed_covered_area = (
        instance.covered_area != instance._Property_Info__original_covered_area
    )

    if changed_property_type or changed_maintenance or changed_covered_area:
        if created:
            description = (
                "Property Information Created:\nProperty Type = %s\nMaintenance = %s\nCovered_Area = %s"
                % (instance.property_type, instance.maintenance, instance.covered_area)
            )
        else:
            description = (
                "Property Information Updated:\nProperty Type = %s\nMaintenance = %s\nCovered_Area = %s"
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
        "Property Information Deleted:\nProperty Type = %s\nMaintenance = %s\nCovered_Area = %s"
        % (instance.property_type, instance.maintenance, instance.covered_area)
    )

    Announcement.objects.create(
        author="Admin",
        category="Notification",
        description=description,
    )


@receiver(post_save, sender=Inventory)
def save_inventory(sender, instance, created, **kwargs):
    changed_item = instance.item != instance._Inventory__original_item
    changed_quantity = instance.quantity != instance._Inventory__original_quantity
    if changed_item or changed_quantity:
        if created:
            description = "Inventory Item Created:\nItem = %s\nQuantity = %s" % (
                instance.item,
                instance.quantity,
            )
        else:
            description = "Inventory Item Updated:\nItem = %s\nQuantity = %s" % (
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
    description = "Inventory Item Deleted:\nItem = %s\nQuantity = %s" % (
        instance.item,
        instance.quantity,
    )

    Announcement.objects.create(
        author="Admin",
        category="Notification",
        description=description,
    )
