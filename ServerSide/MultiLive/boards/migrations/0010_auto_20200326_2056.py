# Generated by Django 3.0.2 on 2020-03-26 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0009_auto_20200326_2055'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='json_board',
            field=models.TextField(default='[]', max_length=1000000),
        ),
    ]