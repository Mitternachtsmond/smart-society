from django.db import models

# Create your models here.
class Members(models.Model):
    property_no  = models.CharField(max_length=4, primary_key=True)
    name = models.CharField(max_length=20)
    member_type = models.CharField(max_length=20)

class Questions(models.Model):
    title = models.CharField(max_length=50)
    question = models.TextField()
    options = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        unique_together = (('title','question','options'),)

class Voting(models.Model):
    property_no  = models.ForeignKey(Members, on_delete=models.CASCADE)
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)
    decision = models.CharField(max_length=500)

    class Meta:
        unique_together = (('property_no', 'question',),)

class Announcements(models.Model):
    sr_no = models.AutoField(primary_key=True)
    author = models.CharField(max_length=20)
    category = models.CharField(max_length=10, choices=[('N','notifiaction'),('C','complaint'),('V','voting')])
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=500)