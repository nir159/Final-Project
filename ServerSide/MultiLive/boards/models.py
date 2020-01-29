from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Board(models.Model):
    name = models.CharField(max_length=256)
    owner = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    desc = models.TextField(max_length=256)
    creation_time = models.DateTimeField(auto_now_add=True)
    json_board = models.TextField(max_length=1024)

    def __str__(self):
        return self.name
