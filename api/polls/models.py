from django.db import models
from users.models import Member
from django.utils.translation import ugettext_lazy as _


class Question(models.Model):
    s_no = models.AutoField(primary_key=True)
    title = models.CharField(_("Title"), max_length=50)
    question = models.TextField(_("Decision"))
    options = models.TextField(_("Options"))

    def __str__(self):
        return self.title

    class Meta:
        unique_together = (("title", "question", "options"),)
        ordering = ["-s_no"]


class Voting(models.Model):
    s_no = models.AutoField(primary_key=True)
    property_no = models.ForeignKey(
        Member,
        on_delete=models.CASCADE,
        verbose_name=_("Property No."),
        null=True,
        blank=True,
    )
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        verbose_name=_("Question"),
    )
    decision = models.CharField(_("Decision"), max_length=500)

    class Meta:
        unique_together = (
            (
                "property_no",
                "question",
            ),
        )
        verbose_name_plural = "Voting"
