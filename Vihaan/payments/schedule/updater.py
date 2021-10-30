from apscheduler.schedulers.background import BackgroundScheduler
from payments.views import *
from django.http import request
def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(addMaintenance, 'cron', day='1', hour='0', id="monthly_trigger", replace_existing=True)
    scheduler.start() 
