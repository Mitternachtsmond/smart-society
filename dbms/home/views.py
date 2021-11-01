# import re
from django.db.models.query import QuerySet
from django.http.response import HttpResponse
from django.shortcuts import render
# from django.http import HttpRequest, JsonResponse
# from django.views.decorators.csrf import csrf_exempt, csrf_protect
# from rest_framework.parsers import JSONParser
from .models import Society_Staff,Personal_Staff
from .serializers import Society_StaffSerializer,Personal_StaffSerializer
# from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import os


from rest_framework import viewsets
from django.shortcuts import get_object_or_404
# Create your views here.

class PersonalStaffViewSet(viewsets.ViewSet):
    # lookup_field='id'
    def list(self,request):
        Ps=Personal_Staff.objects.all()
        serializer=Personal_StaffSerializer(Ps,many=True)
        return Response(serializer.data)
    
    def create(self,request):
        serializer=Personal_StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self,request,pk=None):
        querySet=Personal_Staff.objects.all()
        Ps=get_object_or_404(querySet,pk=pk)
        serializer=Personal_StaffSerializer(Ps)
        return Response(serializer.data)
    
    def update(self,request,pk=None):
        Ps=Personal_Staff.objects.all()
        serializer=Personal_StaffSerializer(Ps,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    
    
        
        
        
        





class Personal_Staff_APIView(APIView):
    # authentication_classes=[SessionAuthentication,BasicAuthentication]
    # authentication_classes=[TokenAuthentication]
    # permission_classes=[IsAuthenticated]
    
    def get(self,request):
        # print("hello")
        Ps=Personal_Staff.objects.all()
        serializer=Personal_StaffSerializer(Ps,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=Personal_StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class Society_Staff_APIView(APIView):
    def get(self,request):  
        print("1 am in api society")
        Ps=Society_Staff.objects.all()
        serializer=Society_StaffSerializer(Ps,many=True)
        return Response(serializer.data)  
    
    def post(self,request):
        serializer=Society_StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
class SocietyStaffDetailAPIView(APIView):
    
    def get_object(self,pk):
        try:
            return Society_Staff.objects.get(pk=pk)
        except Society_Staff.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        
    def get(self,request,pk):
        print("here")
        staff=self.get_object(pk)
        print(len(staff.image),"here??/")
        print(staff.image)
        if len(staff.image)>0:
            os.remove(staff.image.path)
        serializer=Society_StaffSerializer(staff)
        return Response(serializer.data) 
    
    
    def put(self,request,pk):
        # staff=self.get_object(pk)
        serializer=Society_StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
    def delete(self,request,pk):
        staff=self.get_object(pk)
        staff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PersonalStaffDetailAPIView(APIView):
    
    def get_object(self,pk):
        try:
            return Personal_Staff.objects.get(pk=pk)
        except Personal_Staff.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        
    def get(self,request,pk):
        staff=self.get_object(pk)
        serializer=Personal_StaffSerializer(staff)
        return Response(serializer.data) 
    
    
    def put(self,request,pk):
        # staff=self.get_object(pk)
        serializer=Personal_StaffSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
    
    def delete(self,request,pk):
        staff=self.get_object(pk)
        staff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

           
            



# @api_view(['GET','POST'])
# def Personal_Staff_View(request):
#     if request.method=='GET':
#         Ps=Personal_Staff.objects.all()
#         serializer=Personal_StaffSerializer(Ps,many=True)
#         return Response(serializer.data)
    
    
#     elif request.method=='POST':
    
#         serializer=Personal_StaffSerializer(data=request.data)
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET','POST'])
# def Society_Staff_View(request):
#     if request.method=='GET':
#         Ps=Society_Staff.objects.all()
#         serializer=Society_StaffSerializer(Ps,many=True)
#         return Response(serializer.data)
    
    
#     elif request.method=='POST':
    
#         serializer=Society_StaffSerializer(data=request.data)
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



# @api_view(['GET','PUT','DELETE'])
# def PersonalStaffDetail(request, pk):
#     try:
#         staff= Personal_Staff.objects.get(pk=pk)
#     except Personal_Staff.DoesNotExist:
#         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method=='GET':
#         serializer=Personal_StaffSerializer(staff)
#         return Response(serializer.data)
    
#     elif request.method=='PUT':
#             serializer=Personal_StaffSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
            
#             return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
        
#     elif request.method=='DELETE':
#             staff.delete()
            
# @api_view(['GET','PUT','DELETE'])
# def SocietyStaffDetail(request, pk):
#     try:
#         staff= Society_Staff.objects.get(pk=pk)
#     except Society_Staff.DoesNotExist:
#         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method=='GET':
#         serializer=Society_StaffSerializer(staff)
#         return Response(serializer.data)
    
#     elif request.method=='PUT':
#             serializer=Society_StaffSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
            
#             return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
        
#     elif request.method=='DELETE':
#             staff.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
    
            