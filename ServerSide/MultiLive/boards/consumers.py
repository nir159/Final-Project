from channels.generic.websocket import AsyncWebsocketConsumer
import json


class BoardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.board_id = self.scope['url_route']['kwargs']['board_id']
        self.board_group_name = 'board_{}'.format(self.board_id)

        # Join room group
        await self.channel_layer.group_add(
            self.board_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.board_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        msg, user = text_data_json['message'], text_data_json['user']

        # Send message to room group
        await self.channel_layer.group_send(
            self.board_group_name,
            {
                'type': 'board_msg',
                'user': user,
                'message': msg,
            }
        )

    # Receive message from room group
    async def board_msg(self, event):
        msg, user = event['message'], event['user']
        print("{}: {}".format(self.board_group_name, user))

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'user': user,
            'message': msg,
        }))
