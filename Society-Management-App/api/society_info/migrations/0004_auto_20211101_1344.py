# Generated by Django 3.2.7 on 2021-11-01 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('society_info', '0003_auto_20211030_1524'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='maintenance',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='maintenance',
            name='property_no',
        ),
        migrations.DeleteModel(
            name='Transaction',
        ),
        migrations.DeleteModel(
            name='Maintenance',
        ),
    ]