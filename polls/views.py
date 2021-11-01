import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from django.db import IntegrityError

from .models import Members, Questions, Announcements, Voting

from .serializers import PollSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

from django.utils.decorators import method_decorator

def is_admin(request):
    user_id = request.user.username
    return Members.objects.get(property_no=user_id).member_type=="admin"

class Polls(APIView):

    def get(self, request): # gives all the running polls
        polls = Questions.objects.all()
        serializer = PollSerializer(polls,many=True)
        return Response(serializer.data)#, safe = False)

    @login_required
    def post(self, request): # admin can create new polls from here
        if not is_admin(request):
            return Response({'status':'inadequate permissions'})

        serializer = PollSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status':'success'})  

        return Response({'status':'Invalid data'})

    @login_required
    def delete(self, request): # admin can end an existing poll from here 
        if not is_admin(request):
            return JsonResponse({'status':'inadequate permissions'})
        poll_id = request.DELETE['id']
        try:
            question = Questions.objects.get(pk=poll_id)
        except Questions.DoesNotExist:
            return JsonResponse({'status':'key does not exist'})
        
        result = {}
        options = question.options.split(";")
        votes = Voting.objects.filter(question=question)
        for option in options:
            result[option]= votes.filter(decision=option).count()

        description = {
            "question":question.question,
            "options": json.dumps(result)
        }
        anncmnt = Announcements(author="admin",category="V",description= json.dumps(description))
        anncmnt.save()
        question.delete()
        return JsonResponse({'status':'success'})

class Vote(APIView):

    def get(self, request, poll_id): # user gets the voting question from here
        poll = Questions.objects.get(pk=poll_id) # Assuming poll is a dict object
        serializer = PollSerializer(poll)
        return Response(serializer.data)

    @login_required
    def post(self, request, poll_id): # user vote from here
        user_id = request.user.username
        user = Members.objects.get(property_no=user_id)
        poll = Questions.objects.get(pk=poll_id)
        decision = request.POST['decision']
        try:
            vote = Voting.objects.create(property_no=user_id,decision=decision,question=poll)
            vote.save()
            return JsonResponse({'status':'success'})
        except IntegrityError:
            return JsonResponse({'status':'user already voted'})

class Announcements(APIView):

    def get(self, request): # user gets to search the announcements, filter , paginate etc
        pass
        return Response({"working":'OK'})

    def post(self, request): # admin can post announcemets or users can complain here
        pass
        return Response({"working":'OK'})