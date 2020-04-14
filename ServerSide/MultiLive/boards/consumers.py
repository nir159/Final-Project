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
        board = text_data_json['json_board']

        # Send message to room group
        await self.channel_layer.group_send(
            self.board_group_name,
            {
                'type': 'board_msg',
                'json_board': board,
            }
        )

    # Receive message from room group
    async def board_msg(self, event):
        board = event['json_board']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'json_board': board,
        }))
