from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination

from .models import Question, Voting
from .serializers import Question_Serializer, Voting_Serializer


class Polls(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = Question_Serializer
    filter_backends = (SearchFilter, OrderingFilter)
    pagination_class = PageNumberPagination
    search_fields = ("title", "question")


class Polls_Result(generics.RetrieveDestroyAPIView):

    lookup_field = "s_no"
    queryset = Question.objects.all()
    serializer_class = Question_Serializer


class Vote(generics.CreateAPIView):
    queryset = Voting.objects.all()
    serializer_class = Voting_Serializer
    filter_backends = (SearchFilter, OrderingFilter)
    pagination_class = PageNumberPagination
    search_fields = ("property_no", "question")
