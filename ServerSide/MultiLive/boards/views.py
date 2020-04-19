from rest_framework import viewsets, generics, filters
from .serializers import BoardSerializer, BoardMiniSerializer
from .models import Board
from rest_framework.response import Response
# Create your views here.


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def list(self, request, *args, **kwargs):
        boards = Board.objects.all()
        serializer = BoardMiniSerializer(boards, many=True)
        return Response(serializer.data)


class BoardAPIView(generics.ListCreateAPIView):
    search_fields = ['owner__email']
    filter_backends = (filters.SearchFilter,)
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

