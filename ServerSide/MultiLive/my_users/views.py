from django.shortcuts import render
from rest_framework import viewsets, status
from .serializers import UserSerializer#, UserMiniSerializer
from .models import MyUser
from rest_framework.response import Response
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    '''def list(self, request, *args, **kwargs):
        my_users = User.objects.all()
        serializer = UserMiniSerializer(my_users, many=True)
        return Response(serializer.data)'''


def get_id(request, email):
    try:
        user = MyUser.objects.get(email=email)
        return HttpResponse(user.id)
    except ObjectDoesNotExist:
        return HttpResponse(-1)

