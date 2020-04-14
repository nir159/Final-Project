from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/boards/chat/(?P<board_id>\w+)/$', consumers.BoardConsumer)
]
