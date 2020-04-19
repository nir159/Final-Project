# from ..my_users.models import MyUser
# Create your models here.
from django.db import models


def board_dir_path(instance, filename):

    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'uploads/boards/{}.{}'.format(instance.id, filename.split('.')[-1])


class Board(models.Model):

    name = models.CharField(max_length=256)
    thumbnail_picture = models.ImageField(upload_to=board_dir_path, max_length=500, default='default.png')
    owner = models.ForeignKey('my_users.MyUser', default=None, on_delete=models.CASCADE)
    last_opened = models.DateTimeField(auto_now_add=True)
    desc = models.TextField(max_length=256)
    creation_time = models.DateTimeField(auto_now_add=True)
    json_board = models.TextField(max_length=10**6, default='[]')
    users = models.TextField(max_length=500, default="[]")
    permissions = models.TextField(max_length=500, default="[]")

    def __str__(self):
        return self.name

