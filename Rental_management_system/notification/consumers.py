
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer






class get_All_Posted_Review(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.group_name='notification'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()




    async def receive(self):
        pass
       
    
    async def disconnect(self):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def send_Notification_Message(self, event):

        print("-------------------------------------")
        # data = json.loads(event['notification'])
        print("helllllllllllllllllppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")


        await self.send_json({
            'command': 'notification',
            'notification': event['notification']
        })

        # print(event)
        # data = json.loads(event['value'])
        # self.send(text_data=json.dumps({
        #     'payload': data
        # }))

        
# class get_All_Posted_Review(WebsocketConsumer):

#     def connect(self):
#         self.room_name = self.scope['url_route']['kwargs']['user_id']
#         self.room_group_name = "user_%s" % self.room_name

#         (self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )

#         self.accept()
#         self.send(text_data= json.dumps({'status': "connected from new async  consumer"}))
#         print("i am connected in next 22")

    
#     def receive(self):
#         pass
       
    
#     async def disconnect(self):

#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name,
#             self.channel_name
#         )
#         # self.channel_layer.group_discard(
#         #     self.room_group_name,
#         #     self.channel_name
#         # )


#     def send_Notification_Message(self, event):

#         # print("-------------------------------------")
#         # # data = json.loads(event['notification'])
#         # print("helllllllllllllllllppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")


#         # await self.send_json({
#         #     'command': 'notification',
#         #     'notification': event['notification']
#         # })

#         print(event)
#         data = json.loads(event['value'])
#         self.send(text_data=json.dumps({
#             'payload': data
#         }))

        

















# class get_All_Posted_Review(AsyncJsonWebsocketConsumer):

#     async def connect(self):
#         self.room_name = self.scope['url_route']['kwargs']['pk']
#         self.room_group_name = "userId_%s" % self.room_name

#         await (self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )

#         await self.accept()
#         await self.send(text_data= json.dumps({'status': "connected from new async  consumer"}))
#         print("i am connected in part 2")

    
#     async def receive(self):
#         pass
       
    
#     # async def disconnect(self):
#     #     await self.channel_layer.group_discard(
#     #         self.room_group_name,
#     #         self.channel_name
#     #     )


#     async def send_Notification_Message(self, event):

#         print("-------------------------------------")
#         # data = json.loads(event['notification'])

#         await self.send_json({
#             'command': 'notification',
#             'notification': event['notification']
#         })

        
