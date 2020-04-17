from django.shortcuts import render, redirect
from rest_framework import viewsets, status, mixins
from .serializers import UserSerializer#, UserMiniSerializer
from .models import MyUser
from rest_framework.response import Response
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
import json
from rest_framework import filters
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    '''def list(self, request, *args, **kwargs):
        my_users = MyUser.objects.all()
        serializer = UserMiniSerializer(my_users, many=True)
        return Response(serializer.data)'''


class UserAPIView(generics.ListCreateAPIView):
    search_fields = ['email']
    filter_backends = (filters.SearchFilter,)
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


class EmailUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer
