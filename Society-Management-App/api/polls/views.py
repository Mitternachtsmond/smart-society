from rest_framework import generics
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from users.models import Member
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
    def post(self, request, poll_id):
#         request.data._mutable = True
        request.data["property_no"] = (
            Member.objects.filter(property_no=request.user).first().property_no
        )
        request.data["question"] = Question.objects.filter(
            s_no=poll_id).first().s_no
#         request.data._mutable = False

        return super(Vote, self).post(request)

    queryset = Voting.objects.all()
    serializer_class = Voting_Serializer
