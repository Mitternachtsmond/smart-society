from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Member
from payments.models import Maintenance


@receiver(post_save, sender=Member)
def save_member(sender, instance, **kwargs):
    Maintenance.objects.create(property_no=instance)
