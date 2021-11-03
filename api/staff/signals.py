from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

from .models import Personal_Staff, Society_Staff


@receiver(pre_save, sender=Personal_Staff)
def update_personal(sender, instance, **kwargs):
    if not instance._state.adding:
        Personal_Staff.objects.filter(s_no=instance.s_no).first().image.delete(False)


@receiver(post_delete, sender=Personal_Staff)
def delete_personal(sender, instance, **kwargs):
    instance.image.delete(False)


@receiver(pre_save, sender=Society_Staff)
def update_society(sender, instance, **kwargs):
    if not instance._state.adding:
        Society_Staff.objects.filter(s_no=instance.s_no).first().image.delete(False)


@receiver(post_delete, sender=Society_Staff)
def delete_society(sender, instance, **kwargs):
    instance.image.delete(False)
