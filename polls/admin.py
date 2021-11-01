from django.contrib import admin
from .models import Members, Questions, Announcements, Voting

# Register your models here.
admin.site.register(Members)
admin.site.register(Voting)
admin.site.register(Announcements)
admin.site.register(Questions)