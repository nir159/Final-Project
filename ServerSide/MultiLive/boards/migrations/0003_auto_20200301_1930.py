# Generated by Django 3.0.2 on 2020-03-01 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0002_board_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='users',
            field=models.TextField(default='{}', max_length=500),
        ),
    ]