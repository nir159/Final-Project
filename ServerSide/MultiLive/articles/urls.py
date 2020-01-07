from django.urls import path, re_path, include
from . import views
from rest_framework import routers

# api router
router = routers.DefaultRouter()
router.register('articles', views.ArticleViewSet)

app_name = 'articles'

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.article_list, name="list"),
    path('create/', views.article_create, name="create"),
    re_path(r'^(?P<slug>[\w-]+)/$', views.article_detail, name="detail"),
]
