from rest_framework import serializers
from .models import Question, Voting


class Question_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class Voting_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Voting
        fields = "__all__"
