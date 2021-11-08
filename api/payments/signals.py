from datetime import datetime
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from society_info.models import Announcement

from .models import Maintenance, Transaction


@receiver(pre_save, sender=Maintenance)
def save_maintenance(sender, instance, **kwargs):
    if not instance._state.adding:
        description = "Maintenance Payment Received:\nProperty No = %s\nMonth = %s\nBasic Amount = %s\nPaid = %s\nPenalty = %s\nDue Amount = %s" % (
            instance.property_no,
            instance.month,
            instance.amount_basic,
            instance.amount_paid,
            instance.amount_penalty,
            instance.amount_due,
        )
        net_amount_paid = instance.amount_paid - (
            Maintenance.objects.filter(
                property_no=instance.property_no,
                month=instance.month,
            )
            .first()
            .amount_paid

        )
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
        local_time = instance.date.strftime("%b %d %Y %H:%M:%S")
        if created:
            description = "New Transaction: Amount %s paid to %s on %s" % (
                instance.amount,
                instance.to,
                local_time,
            )
        else:
            description = "Transaction Update:\nDate = %s\nPaid To = %s\nAmount = %s" % (
                local_time,
                instance.to,
                instance.amount,
            )
        Announcement.objects.create(
            author="Admin",
            category="Notification",
            description=description,
        )
