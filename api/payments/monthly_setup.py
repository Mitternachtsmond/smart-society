import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from payments.models import Maintenance
from society_info.models import Announcement
from users.models import Member


def monthly_maintenance():
    for i in Member.objects.all():
        Maintenance.objects.create(property_no=i)

    date_now = datetime.datetime.now()
    description = (
        "Maintenance Bills for the month of %s %s have now been generated."
        % (date_now.strftime("%B"), date_now.year)
    )
    Announcement.objects.create(
        author="Admin",
        category="Notification",
        description=description,
    )


def start_scheduler():
    sched = BackgroundScheduler(timezone="Asia/Kolkata")
    sched.add_job(monthly_maintenance, "cron", day=1, hour=10, minute=0, second=0)
    sched.start()
