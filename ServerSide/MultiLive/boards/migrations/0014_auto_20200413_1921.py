# Generated by Django 3.0.2 on 2020-04-13 16:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0013_auto_20200412_1554'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='friends',
        ),
        migrations.RemoveField(
            model_name='contact',
            name='user',
        ),
        migrations.RemoveField(
            model_name='message',
            name='contact',
        ),
        migrations.DeleteModel(
            name='Chat',
        ),
        migrations.DeleteModel(
            name='Contact',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
    ]