# Generated by Django 3.0.5 on 2020-04-19 13:42

from django.db import migrations, models
import my_users.models


class Migration(migrations.Migration):

    dependencies = [
        ('my_users', '0006_myuser_notifications'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='profile_picture',
            field=models.ImageField(default=None, max_length=500, upload_to=my_users.models.user_dir_path),
            preserve_default=False,
        ),
    ]
