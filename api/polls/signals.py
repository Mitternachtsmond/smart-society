from django.db.models.signals import pre_delete
from django.dispatch import receiver
from society_info.models import Announcement

from .models import Question, Voting


@receiver(pre_delete, sender=Question)
def delete_question(sender, instance, **kwargs):

    result = ""
    options = instance.options.split(";")
    votes = Voting.objects.filter(question=instance)
    for option in options:
        result += "%s: %d\n" % (option, votes.filter(decision=option).count())

    description = "Poll: %s\n" % (instance.question)
    description += "Result:\n" + result
    Announcement.objects.create(
        author="Admin",
        category="Voting Result",
        description=description,
    )
