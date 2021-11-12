from datetime import datetime
from typing import Sequence
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from society_info.models import Announcement

from .models import Maintenance, Transaction, Penalty


@receiver(post_save, sender=Penalty)
def save_penalty(sender, instance, **kwargs):
    Announcement.objects.create(
        author="Admin",
        category="Notification",
        description=f"The penalty has been changed to {instance.penalty}% per month."
    )


@receiver(pre_save, sender=Maintenance)
def save_maintenance(sender, instance, **kwargs):
    if not instance._state.adding:
        description = "Payment Received:\nProperty No = %s\nMonth = %s\nBasic Amount = %s\nPaid = %s\nPenalty = %s\nDue Amount = %s" % (
            instance.property_no,
            instance.month,
            instance.amount_basic,
            instance.amount_paid,
            instance.amount_penalty,
            instance.amount_due,
        )
        net_amount_paid = instance.amount_paid - (
            Maintenance.objects.get(
                property_no=instance.property_no,
                month=instance.month,
            ).amount_paid

        )

        if net_amount_paid > 0:
            Transaction.objects.create(
                option="received",
                to=instance.property_no,
                amount=net_amount_paid,
                description=description,
                date=datetime.now()
            )


@receiver(post_save, sender=Transaction)
def save_transaction(sender, instance, created, **kwargs):
    if instance.option == "paid":
        description = "New Transaction: Amount %s paid to %s" % (
            instance.amount,
            instance.to,
        )
        Announcement.objects.create(
            author="Admin",
            category="Notification",
            description=description,
        )
