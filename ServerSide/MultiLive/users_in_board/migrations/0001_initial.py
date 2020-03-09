# Generated by Django 3.0.2 on 2020-02-25 16:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('boards', '0001_initial'),
        ('my_users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInBoard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permissions', models.CharField(choices=[('w', 'Write'), ('r', 'Read')], max_length=1)),
                ('in_board', models.BooleanField()),
                ('board', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='boards.Board')),
                ('user', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='my_users.MyUser')),
            ],
        ),
    ]