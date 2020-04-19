from rest_framework import viewsets, generics, filters, status
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


class BoardThumbPictureCreate(generics.CreateAPIView):

    serializer_class = BoardSerializer

    def post(self, request):

        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():

            # Save request image in the database
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
