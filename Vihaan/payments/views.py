from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.utils import translation
from django.views.decorators.csrf import csrf_exempt
from rest_framework import response
from rest_framework import viewsets
from .models import *
from .serializers import *
from datetime import datetime
from django.db.utils import IntegrityError
# Create your views here.
rate = 5

class MaintenanceViewSet(viewsets.ModelViewSet):
    serializer_class = MaintenanceSerializer
    queryset = Maintenance.objects.all()

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

def totalFunds():
    transactions = Transaction.objects.all().values('amount', 'choices')
    funds = 0
    for transaction in transactions:
        if transaction['choices'] == 'receive':
            funds = funds + transaction['amount']
        elif transaction['choices'].lower() == 'send':
            funds = funds - transaction['amount']
    return funds

def home(request):
    return HttpResponse("This is the payments app page!")

@csrf_exempt
def maintenance(request):
    if request.method == 'GET':
        data = list(Maintenance.objects.all().values())
        return JsonResponse(data, safe=False)

    if request.method == 'POST':    # assuming that there is no discontinuity in months when maintenance is charged.
                                    # So if, there is some due pending for March and no maintenance for April is charged, 
                                    # then due will basically reset to basic amount of May from May onwards.
                                    # This is a fair assumption as always, the monthly maintenance is charged in all the 12 months of the year
        property = request.POST["property"]
        date = datetime.strptime(request.POST["date"], '%Y-%m-%d')
        basic = int(request.POST["basic"])
        if date.month == 1:
            queryset = Maintenance.objects.filter(property=property, date__month = 12, date__year = date.year - 1).values('due')
        else:
            queryset = Maintenance.objects.filter(property=property, date__month = date.month-1, date__year = date.year).values('due')
        penalty = 0
        if queryset:
            prevDue = queryset.first()['due']
            if prevDue>0:
                due = prevDue*(1+rate/100)+basic
            else:
                due = prevDue+basic
            penalty = (prevDue*rate)/100
        else:
            due = basic        
        row = Maintenance(property = property, date = date, basic = basic, due = due, penalty = penalty)
        try:
            row.save()
        except IntegrityError:
            return HttpResponse("this resident is already requested to pay this month's maintenance")
        return HttpResponse("data saved")

@csrf_exempt
def pay(request):
    if request.method == 'POST':
        property = request.POST["property"]
        amount = int(request.POST["amount"])
        queryset = Maintenance.objects.filter(property=property).order_by('date').values('id', 'due', 'paid').last()
        due = queryset['due']
        id = queryset['id']
        paid = queryset['paid']
        lastrow = Maintenance.objects.filter(id=id)
        lastrow.update(paid=(paid+amount))
        lastrow.update(due=(due-amount))
        return HttpResponse("payment done")

@csrf_exempt
def penaltyRate(request):
    global rate
    if request.method == 'GET':
        return HttpResponse(f'The current penalty rate is {rate}')

    if request.method == 'POST':
        rate = request.POST['penaltyRate']
        return HttpResponse(f'Current penalty rate has been changed to {rate}')

def funds(request):
    if request.method == 'GET':
        funds = totalFunds()
        return HttpResponse(f"The total funds available are {funds}")

@csrf_exempt
def transactions(request):
    if request.method == 'GET':
        data = list(Transaction.objects.all().values())
        return JsonResponse(data, safe=False)

    if request.method == 'POST':
        amount = int(request.POST['amount'])
        choice = request.POST['choice']
        to_from = request.POST['to_from']
        description = request.POST['description']
        funds = totalFunds()
        if choice == 'send':
            if funds<amount:
                return HttpResponse('Insufficient Funds')
        row = Transaction(amount = amount, choices = choice, to_from = to_from, description = description)
        row.save()
        return HttpResponse('transaction added successfully')

def addMaintenance():
    print('hello, this is getting printed from the scheduler call')
    # members = Members.objects.all().values('property', 'property_type')
    # properties = {}
    # for member in members:
    #   properties[member['property']] = member['property_type']
    # for property in properties:
    #    property_info = properties['property'].property_info_set.all()
    #    
    # # now apply same logic as post request and use the basic value as obtained from property_info
    #
    #