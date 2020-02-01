from django.db import models

# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    email = models.CharField(max_length=256)
    password = models.CharField(max_length=256)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
