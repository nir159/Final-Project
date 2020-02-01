from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, UserMiniSerializer
from .models import User
from rest_framework.response import Response
# Create your views here.


class BoardViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserMiniSerializer(users, many=True)
        return Response(serializer.data)
