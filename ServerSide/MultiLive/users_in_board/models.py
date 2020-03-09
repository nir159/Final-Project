from django.db import models


# Create your models here.
class UserInBoard(models.Model):

    user = models.ForeignKey('my_users.MyUser', default=None, on_delete=models.CASCADE)
    board = models.ForeignKey('boards.Board', default=None, on_delete=models.CASCADE)
    permissions = models.CharField(max_length=1, choices=[('w', 'Write'), ('r', 'Read')])
    in_board = models.BooleanField()

    def __str__(self):
        return "{} /w {}".format(self.board, self.user)

