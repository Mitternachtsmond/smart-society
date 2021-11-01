from django.db import models
import datetime
from django.utils import timezone
# Create your models here.
class Transaction(models.Model):
    TRANSACTION_CHOICES = [('send', 'Sent'), ('receive', 'Received')]
    amount = models.IntegerField()
    datetime = models.DateTimeField('when', default=timezone.now)
    choices = models.CharField(max_length=7, choices=TRANSACTION_CHOICES, default='send')
    to_from = models.CharField('to/from', max_length=64, default="")
    description = models.CharField(max_length=200, null=True)

    class Meta:
        verbose_name = "transaction"
        verbose_name_plural = "transactions"

    def __str__(self):
        return f"{self.choices} amount of {self.amount}"

class Maintenance(models.Model): # Django will create a primary key id no matter
    property = models.CharField('property number', max_length=16) # change to foreign key  
    date = models.DateField(auto_now_add=True)           # Extract month, years
    basic = models.IntegerField('amount basic')        # change to foreign key  
    due = models.IntegerField('amount due')          # refers to the total due of a person  
    paid = models.IntegerField('amount paid', default=0) #refers to the amount paid in the given month
    penalty = models.IntegerField(default=0)               #penalty due to previous month due
    class Meta:
        unique_together = ['property', 'date']
        verbose_name = "maintenance"
        verbose_name_plural = "maintenance"

    def __str__(self):
        month_object = datetime.datetime.strptime(str(self.date.month), "%m")
        month_name = month_object.strftime("%B")
        return f"Amount {self.due} pending from {self.property} in {month_name}, {self.date.year}"
    
