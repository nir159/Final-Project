# Generated by Django 3.0.2 on 2020-02-25 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('first_name', models.CharField(max_length=256)),
                ('last_name', models.CharField(max_length=256)),
                ('email', models.EmailField(max_length=256, primary_key=True, serialize=False)),
                ('pw', models.CharField(max_length=256)),
            ],
        ),
    ]
