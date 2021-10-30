from typing_extensions import ParamSpec
from django.db import models
from django.db.models import base
from django.db.models.base import Model
from django.db.models.deletion import DO_NOTHING, SET_NULL
from django.db.models.enums import Choices
from django.db.models.fields import AutoField
from rest_framework.fields import DateTimeField
from satwik_simply_home import settings
from datetime import datetime

class member(models.Model):
    property_no = models.CharField("Property Number",max_length=10,
    primary_key=True
    )
    property_type = models.CharField(
        max_length= 30,
        null=True,
        verbose_name="Property Type",
    )
    name = models.CharField("Name",max_length=50)
    mobile_no = models.CharField("Mobile Number",max_length=50)
    tenant_name = models.CharField("Tenant Name", max_length=50, null=True, blank=True)
    tenant_mobile = models.CharField("Tenant Mobile" ,max_length=50, null=True, blank=True)
    def __str__(self):
        return self.property_no

class parking(models.Model):
    Choices = (
        ('Filled','Filled'),
        ('Empty', 'Empty')
    )
    id = models.CharField("Parking Slot id", primary_key=True,max_length=10)
    property = models.ForeignKey(member, on_delete=SET_NULL, null=True, blank=True)
    filled = models.CharField("Status",choices=Choices,max_length=10)
    def delete(self):
        super(parking, self).delete()
    def __str__(self):
        return str(self.id)


class gate_log(models.Model):
    vehicle_types = (
        ("2-wheeler","2-wheeler"),
        ('4-wheeler','4-wheeler')
    )
    sno = models.AutoField("Serial Number",primary_key=True)
    name = models.CharField(
        "Name of the Entry Person",
        max_length=50
        )
    property_no = models.ForeignKey(member,on_delete=models.CASCADE, verbose_name="Property Number")
    entry = models.DateTimeField("Entry time", default=datetime.now)
    exit = models.DateTimeField("Exit time", default = datetime.now, blank=True, null=True)
    vehicle_type = models.CharField("Vehicle type", max_length=20, choices=vehicle_types)
    vehicle_number = models.CharField("Vehicle Number", max_length=30,null=True, blank=True)
    parking = models.ForeignKey(parking, on_delete=models.CASCADE, null=True, blank=True)
