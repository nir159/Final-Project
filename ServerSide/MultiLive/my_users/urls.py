from django.urls import include, path, re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'my_users', views.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework_users')),
    # path('get_all/', views.UserViewSet.as_view()),
    path('get_user/', views.UserAPIView.as_view()),
    # path('get_user/<str:email>/', views.get_user),
]
