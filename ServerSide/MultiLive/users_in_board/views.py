from django.shortcuts import render, redirect
from rest_framework import viewsets, status
from .serializers import UserInBoardSerializer
from .models import UserInBoard


# Create your views here.
class UserInBoardViewSet(viewsets.ModelViewSet):
    queryset = UserInBoard.objects.all()
    serializer_class = UserInBoardSerializer

    '''def list(self, request, *args, **kwargs):
        my_users = UserInBoard.objects.all()
        serializer = UserInBoardSerializer(my_users, many=True)
        return Response(serializer.data)'''

