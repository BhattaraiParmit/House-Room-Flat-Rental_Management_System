
from asyncio import constants
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json
from asgiref.sync import async_to_sync




class ReviewSectionBox(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['pk']
        self.room_group_name = "id_%s" % self.room_name

        await (self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        await self.send(text_data= json.dumps({'status': "connected from new async json2 consumer"}))
        print("i am connected in part 1")

    
    async def receive(self):
        pass
       

    
    async def disconnect(self):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def order_message(self,event):
        await self.send_json({
            'command': 'message',
            'message': event['message'],
        })


    async def send_Notification_Message(self, event):


        print("helllllllllllllllllppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")

        await self.send_json({
            'command': 'notification',
            'notification': event['notification']
        })

        
       




       