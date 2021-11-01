from rest_framework import serializers
from .models import Society_Staff,Personal_Staff


class Society_StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model= Society_Staff
        fields=['Aadhar','name','occupation','salary','workplace','mobile','From','image']
        
        
class Personal_StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model= Personal_Staff
        # fields=['Sno','name']
        fields='__all__'