from django.contrib import admin
from .models import Question


class Question_Admin(admin.ModelAdmin):
    model = Question
    ordering = ("-s_no",)
    search_fields = ("title", "question")
    list_display = ("title", "question", "options")
    list_filter = ()
    filter_horizontal = ()

    fieldsets = ((None, {"fields": ("title", "question", "options")}),)


admin.site.register(Question, Question_Admin)
