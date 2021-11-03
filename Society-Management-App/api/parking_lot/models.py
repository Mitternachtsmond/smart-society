import datetime

from django.db import models
from django.utils.timezone import make_aware
from users.models import Member
from django.utils.translation import ugettext_lazy as _


def ParkingFilling(queryset, property_no):
    for i in queryset:
        if i.parking_id[1] == "V":
            if i.parking_id.split("-")[0] == str(property_no).split("-")[0]:
                i.filled = True
                i.save()
                return i

    for i in queryset:
        if i.parking_id[1] == "V":
            i.filled = True
            i.save()
            return i


class Parking(models.Model):
    parking_id = models.CharField(_("Parking ID"), max_length=25, primary_key=True)
    filled = models.BooleanField(null=True, blank=True, editable=False)
    property_no = models.ForeignKey(
        Member,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name=_("Property No."),
    )

    def __str__(self):
        return self.parking_id

    def save(self, *args, **kwargs):
        if not self.property_no and not self.filled:
            self.property_no = None
            self.filled = False
        else:
            self.filled = True
        super(Parking, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Parking"
        verbose_name_plural = "Parking Spaces"
        ordering = ["parking_id"]


class Gate_Log(models.Model):
    vehicle_types = (("2-wheeler", "2-wheeler"), ("4-wheeler", "4-wheeler"))
    s_no = models.AutoField(primary_key=True)
    entry_time = models.DateTimeField(_("Entry Time"), editable=False)
    name = models.CharField(_("Name"), max_length=50)
    property_no = models.ForeignKey(
        Member, on_delete=models.CASCADE, verbose_name=_("Property No.")
    )
    exited = models.BooleanField(_("Has Exited"), default=True)
    exit_time = models.DateTimeField(
        _("Exit Time"), null=True, blank=True, editable=False
    )
    vehicle_type = models.CharField(
        _("Vehicle Type"), max_length=25, null=True, blank=True, choices=vehicle_types
    )
    vehicle_number = models.CharField(
        _("Vehicle Number"), max_length=20, null=True, blank=True
    )
    parking_id = models.ForeignKey(
        Parking,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        editable=False,
        verbose_name=_("Parking ID"),
    )

    def save(self, *args, **kwargs):
        def check_record(self):
            return len(Gate_Log.objects.filter(s_no=self.s_no))

        def revert_changes(self):
            saved_record = Gate_Log.objects.filter(s_no=self.s_no)[0]
            self.name = saved_record.name
            self.property_no = saved_record.property_no
            self.vehicle_type = saved_record.vehicle_type
            self.vehicle_number = saved_record.vehicle_number

        if not self.vehicle_type and not self.vehicle_number:
            self.parking_id = None
            self.vehicle_type = None
            self.vehicle_number = None

        if not check_record(self):
            if self.exited:
                return
            else:
                self.entry_time = make_aware(datetime.datetime.now())
                self.exit_time = None
                if self.vehicle_type.lower() == "4-wheeler":
                    self.parking_id = ParkingFilling(
                        Parking.objects.filter(filled=False), self.property_no
                    )
        else:
            revert_changes(self)
            if not self.exited:
                return
            else:
                self.exit_time = make_aware(datetime.datetime.now())
                if self.parking_id:
                    self.parking_id.filled = False
                    self.parking_id.save()

        super(Gate_Log, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Gate Entry"
        verbose_name_plural = "Gate Log"
        ordering = ["-entry_time"]
