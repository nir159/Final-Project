# Generated by Django 3.0.2 on 2020-03-01 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='boards',
            field=models.TextField(default='{}', max_length=50),
        ),
    ]
