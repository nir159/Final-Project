from django.db import models
from my_users.models import MyUser

# Create your models here.


class Board(models.Model):
    name = models.CharField(max_length=256)
    owner = models.ForeignKey(MyUser, default=None, on_delete=models.CASCADE)
    desc = models.TextField(max_length=256)
    creation_time = models.DateTimeField(auto_now_add=True)
    json_board = models.TextField(max_length=1024)

    def __str__(self):
        return self.name
