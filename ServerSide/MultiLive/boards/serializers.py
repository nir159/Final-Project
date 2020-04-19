from rest_framework import serializers
from .models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'name', 'thumbnail_picture', 'owner', 'desc', 'creation_time', 'last_opened', 'json_board', 'users', 'permissions']


class BoardMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'name', 'thumbnail_picture', 'owner', 'desc', 'users']
