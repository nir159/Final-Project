# Generated by Django 3.0.2 on 2020-03-08 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_users', '0003_auto_20200301_1930'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='boards',
            field=models.TextField(default='', max_length=500),
        ),
    ]
