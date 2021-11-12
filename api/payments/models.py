import datetime
import dateutil.relativedelta
from django.db import models
from django.utils.translation import ugettext_lazy as _
from users.models import Member


class Penalty(models.Model):
    s_no = models.AutoField(primary_key=True)
    penalty = models.IntegerField(_("Penalty Rate"))

    def __str__(self):
        return f"Penalty is set to {self.penalty}% per month"

    class Meta:
        verbose_name = "Penalty"
        verbose_name_plural = "Penalty"


class Transaction(models.Model):

    options = (("paid", "Paid"), ("received", "Received"))

    s_no = models.AutoField(primary_key=True)
    date = models.DateTimeField(_("Date and Time"))
    amount = models.IntegerField(
        _("Transaction Amount"),
    )
    option = models.CharField(
        _("Paid/Recieved"), max_length=15, choices=options)
    to = models.CharField(_("To/From"), max_length=50)
    description = models.TextField(_("Description"), null=True, blank=True)

    def __str__(self):
        return self.to

    def save(self, *args, **kwargs):
        if not self.description:
            self.description = None
        super(Transaction, self).save(*args, **kwargs)

    class Meta:
        ordering = ["-date"]


class Maintenance(models.Model):

    s_no = models.AutoField(primary_key=True)
    property_no = models.ForeignKey(
        Member,
        on_delete=models.CASCADE,
        editable=False,
        verbose_name=_("Property No."),
    )
    month = models.DateField(_("For the Month"), editable=False)
    amount_basic = models.IntegerField(_("Basic"), blank=True)
    amount_paid = models.IntegerField(_("Paid"), default=0)
    amount_penalty = models.IntegerField(_("Penalty"), editable=False)
    amount_due = models.IntegerField(_("Due"), editable=False)

    def save(self, *args, **kwargs):
        def prev_due(self):
            prev_month = self.month + \
                dateutil.relativedelta.relativedelta(months=-1)
            queryset = Maintenance.objects.filter(
                month=prev_month, property_no=self.property_no
            )
            if len(queryset):
                return queryset[0].amount_due
            else:
                return 0

        if not self.amount_basic:
            self.amount_basic = self.property_no.property_type.maintenance
        if not self.month:
            self.month = datetime.date.today()
        if (
            self.month.month < datetime.date.today().month
            or self.month.year < datetime.date.today().year
        ):
            return
        penalty = Penalty.objects.get().penalty
        self.amount_penalty = penalty * prev_due(self) / 100
        self.amount_penalty = max(self.amount_penalty, 0)
        self.amount_due = (
            self.amount_basic - self.amount_paid +
            self.amount_penalty + prev_due(self)
        )

        super(Maintenance, self).save(*args, **kwargs)

    class Meta:
        unique_together = ("property_no", "month")
        verbose_name = "Maintenance"
        verbose_name_plural = "Maintenance"
        ordering = ["-month", "property_no"]
