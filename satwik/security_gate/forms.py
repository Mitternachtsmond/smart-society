from django import forms
from django.db.models import fields
from django.forms import ModelForm, widgets
from .models import member,parking,gate_log
from django import forms

from security_gate import models

class DateTimeInput(forms.DateTimeInput):
    input_type = 'datetime-local'

class gatelogform(forms.ModelForm):
    class Meta:
        widgets = {
            'entry' : DateTimeInput(),
            'exit' : DateTimeInput()
        }
        model = gate_log
        exclude = ['parking','exit']

class gatelogexitform(forms.ModelForm):
    class Meta:
        widgets = {
            'entry' : DateTimeInput(),
            'exit' : DateTimeInput()
        }
        model = gate_log
        fields = ['exit', 'vehicle_number']    

class parkingform(forms.ModelForm):
    class Meta:
        model = parking
        fields = '__all__'
