from rest_framework import serializers
from .models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'name', 'owner', 'desc', 'creation_time', 'last_opened', 'json_board', 'users', 'permissions']


class BoardMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'name', 'owner', 'desc', 'users']
