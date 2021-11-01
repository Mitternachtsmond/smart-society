from rest_framework import serializers
from .models import Questions, Announcements

class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'