from django.db import models

# Create your models here.


class MyUser(models.Model):

    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    email = models.CharField(max_length=256, unique=True)
    pw = models.CharField(max_length=256)
    # boards = models.ForeignKey('boards.Board', default=None, on_delete=models.CASCADE)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
