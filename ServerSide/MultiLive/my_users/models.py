from django.db import models

# Create your models here.


def user_dir_path(instance, filename):

    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'uploads/users/{}.{}'.format(instance.email.split('@')[0], filename.split('.')[-1])


class MyUser(models.Model):

    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    profile_picture = models.ImageField(upload_to=user_dir_path, max_length=500, default='default.png')
    email = models.EmailField(max_length=256, primary_key=True)
    pw = models.CharField(max_length=256)
    notifications = models.TextField(max_length=500, default="[]")

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
