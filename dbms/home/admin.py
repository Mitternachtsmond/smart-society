from django.contrib import admin
from home.models import Personal_Staff, Society_Staff
from django.utils.html import format_html
# Register your models here.

# admin.site.register(Personal_Staff)
# admin.site.register(Society_Staff)


class Society_StaffAdmin(admin.ModelAdmin):
    
    def img_preview(self,obj):
        return format_html('<img src="{}" width="200px" height="200px" />'.format(obj.image.url))   
    img_preview.short_description="Image Preview"
    img_preview.allow_tags=True
    
    # def aadharimg_preview(self,obj):
    #     return format_html('<img src="{}" width="200px" height="200px" />'.format(obj.aadharimage.url))   
    # aadharimg_preview.short_description="Image Preview"
    # aadharimg_preview.allow_tags=True
    list_display=['name','Aadhar','img_preview','occupation']
    # readonly_fields=('img_preview','aadharimg_preview',)
    readonly_fields=('img_preview',)
class Personal_StaffAdmin(admin.ModelAdmin):
    
    def img_preview(self,obj):
        return format_html('<img src="{}" width="200px" height="200px" />'.format(obj.image.url))   
    img_preview.short_description="Image Preview"
    img_preview.allow_tags=True
    list_display=['name','img_preview','occupation']
    readonly_fields=('img_preview',)

admin.site.register(Society_Staff,Society_StaffAdmin)
admin.site.register(Personal_Staff,Personal_StaffAdmin)