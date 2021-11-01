import pytz
from django.conf import settings
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from society_info.models import Announcement

from .models import Maintenance, Transaction


@receiver(pre_save, sender=Maintenance)
def save_maintenance(sender, instance, **kwargs):
    if not instance._state.adding:
        description = "Maintenance was updated to.\nProperty No = %s\nMonth = %s\nBasic Amount = %s\nPaid = %s\nPenalty = %s\nDue Amount = %s\nPayment Date = %s" % (
            instance.property_no,
            instance.month,
            instance.amount_basic,
            instance.amount_paid,
            instance.amount_penalty,
            instance.amount_due,
            instance.payment_date,
        )
        net_amount_paid = (
            Maintenance.objects.filter(
                property_no=instance.property_no,
                month=instance.month,
            )
            .first()
            .amount_paid
            - instance.amount_paid
        )
        Transaction.objects.create(
            option="received",
            to=instance.property_no,
            amount=net_amount_paid,
            description=description,
        )


@receiver(post_save, sender=Transaction)
def save_transaction(sender, instance, created, **kwargs):
    # if instance.to.split()[0] != "Maintenance":
    if instance.option == "paid":
        timezone = pytz.timezone(settings.TIME_ZONE)
        local_time = instance.date.astimezone(timezone)
        if created:
            description = "Transaction of amount %s was %s to/from %s on %s" % (
                instance.amount,
                instance.option.lower(),
                instance.to,
                str(local_time),
            )
        else:
            description = "Transaction record was updated.\nDate = %s\n%s To/From = %s\nAmount = %s" % (
                str(local_time),
                instance.option.capitalize(),
                instance.to,
                instance.amount,
            )
        Announcement.objects.create(
            author="Admin",
            category="Notification",
            description=description,
        )
