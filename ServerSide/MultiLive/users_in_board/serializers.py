from rest_framework import serializers
from .models import UserInBoard


class UserInBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInBoard
        fields = ['user', 'board', 'permissions', 'in_board']


'''class UserInBoardMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInBoard
        fields = ['user', 'board']'''
