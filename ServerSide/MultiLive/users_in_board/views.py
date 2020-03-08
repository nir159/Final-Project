import requests
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets, status, generics, filters
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


class UsersInBoardAPIView(generics.ListCreateAPIView):
    search_fields = ['board__id']
    filter_backends = (filters.SearchFilter,)
    queryset = UserInBoard.objects.all()
    serializer_class = UserInBoardSerializer


class BoardsOfUserPIView(generics.ListCreateAPIView):
    search_fields = ['user__email']
    filter_backends = (filters.SearchFilter,)
    queryset = UserInBoard.objects.all()
    serializer_class = UserInBoardSerializer


def get_user_boards(request, usr_):

    usr_boards = requests.get('http://localhost:8000/users_in_board/get_boards__user/?search={}'.format(usr_)).json()
    boards_ids = []
    for i in usr_boards:
        boards_ids.append(i["board"])
    print(boards_ids)

    return HttpResponse(JsonResponse({'ids': boards_ids}))
