from typing import Pattern
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from rest_framework import viewsets
from .serializers import ParkingSerializer
from security_gate import admin, serializers
from .forms import gatelogform,gatelogexitform, parkingform
from .models import gate_log, member, parking


def home(request):
    return HttpResponse('hi')

def register_entry(request):
    if request.method == 'GET':
        form = gatelogform()
        return render(request, 'security_gate/register.html', { 'form' : form})
    else:
        form = gatelogform(request.POST)
        property_no = request.POST['property_no']
        block = property_no[:1]
        object_saved = None
        if form.is_valid():
            object_saved=form.save(commit=False)
            if object_saved.vehicle_type == '2-wheeler':
                form.save()
                return HttpResponse("Thank you")
        space_allotted=parking.objects.filter(filled = 'Empty').filter(id__icontains = (block +'v')).order_by('id')
        if len(space_allotted) is not 0 :
            space_allotted[0].filled = 'Filled'
            space_allotted[0].save()
            object_saved.parking = space_allotted[0]
            object_saved.save()
            return HttpResponse("you are alloted " + space_allotted[0].id)
        else:
            space_allotted=parking.objects.filter(filled = 'Empty').filter(id__icontains =('c')).order_by('id')
            if len(space_allotted) is 0:
                return HttpResponse("No space available")
            space_allotted[0].filled = 'Filled'
            object_saved.parking = space_allotted[0]
            object_saved.save()
            return HttpResponse("you are alloted" + space_allotted[0].id)

def exit(request):
    if request.method == 'GET':
        form = gatelogexitform()
        return render(request, 'security_gate/exit.html', {'form' : form})
    else:
        vehicle_num = request.POST['vehicle_number']
        exit_time = request.POST['exit']
        recent_log = gate_log.objects.filter(vehicle_number= vehicle_num).order_by('-sno')[0]
        recent_log.exit = exit_time
        recent_log.parking.filled = 'Empty'
        recent_log.parking.save()
        recent_log.save()
        return HttpResponse('noted')

        
def pending_entry(request):
    spaces_filled = parking.objects.filter(filled = 'Filled').filter(id__icontains = 'v')
    return HttpResponse(spaces_filled)

def create_parking(request):
    if request.method == 'GET':
        form = parkingform()
        return render(request, 'security_gate/register.html', { 'form' : form})
    else:
        form = parkingform(request.POST)
        if form.is_valid():
            form.save()
        return HttpResponse("Created parking space")  

class ParkingView(viewsets.ModelViewSet):
    queryset = parking.objects.all()
    serializer_class = ParkingSerializer





        
