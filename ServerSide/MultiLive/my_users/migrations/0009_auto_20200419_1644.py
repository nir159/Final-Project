# Generated by Django 3.0.5 on 2020-04-19 13:44

from django.db import migrations, models
import my_users.models


class Migration(migrations.Migration):

    dependencies = [
        ('my_users', '0008_auto_20200419_1643'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='profile_picture',
            field=models.ImageField(max_length=500, upload_to=my_users.models.user_dir_path),
        ),
    ]
