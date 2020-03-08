from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users_in_board', views.UserInBoardViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework_users_in_board')),
    path('get_users_in_board/', views.UsersInBoardAPIView.as_view()),
    path('get_boards__user/', views.BoardsOfUserPIView.as_view()),
    path('get_boards_of_user/<str:usr_>', views.get_user_boards),
]
