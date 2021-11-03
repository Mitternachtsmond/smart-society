from django.contrib import admin
from .models import Question, Voting
from users.models import Member


class Question_Admin(admin.ModelAdmin):
    model = Question
    ordering = ("-s_no",)
    search_fields = ("title", "question")
    list_display = ("title", "question", "options")
    list_filter = ()
    filter_horizontal = ()

    fieldsets = ((None, {"fields": ("title", "question", "options")}),)


class Voting_Admin(admin.ModelAdmin):
    model = Voting
    ordering = ("-s_no",)
    search_fields = ("property_no", "question")
    list_display = ("property_no", "question", "decision")
    list_filter = ()
    filter_horizontal = ()
    readonly_fields = ("property_no",)
    fieldsets = ((None, {"fields": ("question", "decision")}),)

    def save_model(self, request, obj, form, change):
        if not obj.property_no:
            obj.property_no = Member.objects.filter(
                property_no=request.user).first()
        obj.save()


admin.site.register(Question, Question_Admin)
admin.site.register(Voting, Voting_Admin)
