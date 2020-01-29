from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import BoardSerializer, BoardMiniSerializer
from .models import Board
from rest_framework.response import Response
# Create your views here.


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def list(self, request, *args, **kwargs):
        movies = Board.objects.all()
        serializer = BoardMiniSerializer(movies, many=True)
        return Response(serializer.data)
