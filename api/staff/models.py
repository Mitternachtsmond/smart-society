from django.conf import settings
from django.db import models
from django.utils.html import mark_safe
from django.utils.translation import ugettext_lazy as _


def upload_personal(instance, filename):
    file_path = "staff/personal_staff/{occupation}/{filename}".format(
        occupation=str(instance.occupation), filename=filename
    )
    return file_path


def upload_society(instance, filename):
    file_path = "staff/society_staff/{occupation}-{filename}".format(
        occupation=str(instance.occupation), filename=filename
    )
    return file_path


class Personal_Staff(models.Model):
    s_no = models.AutoField(primary_key=True)
    name = models.CharField(_("Name"), max_length=50)
    occupation = models.CharField(_("Occupation"), max_length=50)
    image = models.ImageField(_("Staff Image"), upload_to=upload_personal)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Personal Staff"
        verbose_name_plural = "Personal Staff"
        ordering = ["s_no"]

    @property
    def image_preview(self):
        if self.image:
            return mark_safe(
                '<img src="{}" width="100" height="100" />'.format(self.image.url)
            )
        return ""


class Society_Staff(models.Model):
    s_no = models.AutoField(primary_key=True)
    occupation = models.CharField(_("Occupation"), max_length=50)
    aadhaar = models.CharField(
        _("Aadhaar No."), max_length=12, unique=True, blank=True, null=True
    )
    name = models.CharField(_("Name"), max_length=50)
    salary = models.IntegerField(
        _("Salary"),
    )
    work_place = models.CharField(_("Works in"), max_length=50)
    from_place = models.CharField(_("Comes from"), max_length=50)
    mobile_no = models.CharField(_("Mobile No."), max_length=10)
    image = models.ImageField(_("Staff Image"), upload_to=upload_society)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.aadhaar:
            self.aadhaar = None
        super(Society_Staff, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Society Staff"
        verbose_name_plural = "Society Staff"
        ordering = ["s_no"]

    @property
    def image_preview(self):
        if self.image:
            return mark_safe(
                '<img src="{}" width="100" height="100" />'.format(self.image.url)
            )
        return ""
