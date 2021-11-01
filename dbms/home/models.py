from django.db import models
from django.db.models.base import Model
from django.utils.html import format_html
from sorl.thumbnail import get_thumbnail
from django.utils.safestring import mark_safe
# from django.core.validators import RegexValidator


# Create your models here.

# r'^\+?0?\d{10,11}$'  check

class Society_Staff(models.Model):
    # mobile_regex = RegexValidator(regex=r'^\+?0?\d{10,11}$')
    # mobile = models.CharField(validators=[phone_regex], max_length=11)
    
    Aadhar=models.CharField("Aadhar Card",max_length=12,primary_key=True)
    # aadharimage=models.ImageField(null=True,blank=True,default="default.jpg")
    name=models.CharField("Name",max_length=50)
    occupation=models.CharField("Occupation",max_length=50)
    salary=models.DecimalField("Salary",max_digits=8,decimal_places=2)
    workplace=models.CharField("Workplace",max_length=50)
    mobile = models.CharField("Mobile Number",max_length=10)
    From=models.CharField("From",max_length=50)
    image=models.ImageField(null=True,blank=True,default="default.jpg")
    def image_tag(self):
        if self.image:
            # print(self.image.url)
            return mark_safe('<img src="%s" style="width: 45px; height:45px;" />' % self.image.url)
        else:
            return 'No Image Found'
    image_tag.short_description = 'Person Image'   
    # def aadharimage_tag(self):
    #     if self.image:
    #         # print(self.image.url)
    #         return mark_safe('<img src="%s" style="width: 45px; height:45px;" />' % self.aadharimage.url)
    #     else:
    #         return 'No Image Found'
    # image_tag.short_description = 'Aadhar Photo'   
    
    
    class Meta:
        verbose_name="Society_Staff"
        verbose_name_plural="Society_Staffs"
        
    def __str__(self):
        return self.Aadhar +" "+self.name
    
    # def delete(self,*args, **kwargs):
    #     self.image.delete()
    #     # self.aadharimage.delete()
    #     super().delete(*args, **kwargs)
    
    
class Personal_Staff(models.Model):
    Sno= models.AutoField(primary_key=True) 
    name=models.CharField("Name",max_length=50)
    occupation=models.CharField("Occupation",max_length=50)
    image=models.ImageField(null=True,blank=True,default="default.jpg")
    def image_tag(self):
        if self.image:
            return mark_safe('<img src="%s" style="width: 45px; height:45px;" />' % self.image.url)
        else:
            return 'No Image Found'
    image_tag.short_description = 'Person Image'   
    
    
    class Meta:
        verbose_name="Personal_Staff"
        verbose_name_plural="Personal_Staffs"
    def __str__(self):
        return str(self.Sno)+" "+self.name
    
    
    
    