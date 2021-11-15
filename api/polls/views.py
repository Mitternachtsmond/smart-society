from rest_framework import generics, status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from users.models import Member
from .models import Question, Voting
from .serializers import Question_Serializer, Voting_Serializer
from users.models import Member
from django.db import IntegrityError
from django.db.models.base import ObjectDoesNotExist


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

    def create(self, request, s_no):
        serializer = Voting_Serializer(data=request.data)

        if serializer.is_valid():
            try:
                serializer.save(
                    property_no=Member.objects.get(property_no=request.user.username),
                    question=Question.objects.get(s_no=s_no),
                )
                return Response(
                    {"status": "Successfully casted the vote"},
                    status=status.HTTP_201_CREATED,
                )
            except IntegrityError:
                return Response(
                    {"status": "You have already voted!"},
                    status=status.HTTP_409_CONFLICT,
                )
            except ObjectDoesNotExist:
                return Response(
                    {"status": "You cannot vote"}, status=status.HTTP_403_FORBIDDEN
                )
        return Response({"status": "error"}, status=status.HTTP_400_BAD_REQUEST)
