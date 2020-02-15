from django.http import Http404, JsonResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets, generics, filters
from .serializers import BoardSerializer, BoardMiniSerializer
from .models import Board
from rest_framework.response import Response
import requests, json
# Create your views here.


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def list(self, request, *args, **kwargs):
        boards = Board.objects.all()
        serializer = BoardMiniSerializer(boards, many=True)
        return Response(serializer.data)


class BoardAPIView(generics.ListCreateAPIView):
    search_fields = ['owner__id']
    filter_backends = (filters.SearchFilter,)
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


def get_boards_email(request, email):
    req = requests.get('http://localhost:8000/my_users/get_user/?search={}'.format(email)).text
    user = json.loads(req)

    if len(user) > 0:
        return redirect('/boards/get_boards_id/?search={}'.format(user[0]['id']))  # , status=403)
    else:
        raise Http404
