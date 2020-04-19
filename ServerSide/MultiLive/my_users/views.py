from rest_framework import viewsets, status
from .serializers import UserSerializer#, UserMiniSerializer
from .models import MyUser
from rest_framework.response import Response
from rest_framework import generics
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


class UserProfilePictureCreate(generics.CreateAPIView):

    serializer_class = UserSerializer

    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():

            # Save request image in the database
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
