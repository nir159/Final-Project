# from ..my_users.models import MyUser
# Create your models here.
from django.db import models


class Board(models.Model):

    name = models.CharField(max_length=256)
    owner = models.ForeignKey('my_users.MyUser', default=None, on_delete=models.CASCADE)
    last_opened = models.DateTimeField(auto_now_add=True)
    desc = models.TextField(max_length=256)
    creation_time = models.DateTimeField(auto_now_add=True)
    json_board = models.TextField(max_length=10**6, default='[]')
    users = models.TextField(max_length=500, default="[]")

    def __str__(self):
        return self.name

