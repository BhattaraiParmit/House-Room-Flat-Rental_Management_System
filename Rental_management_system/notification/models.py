from email import message
from pyexpat import model
from unicodedata import category
from django.db import models
from app.models  import *

from django.db.models.signals import post_save
from channels.layers import get_channel_layer
from django.dispatch import receiver
from asgiref.sync import async_to_sync


from django.core.serializers import serialize

from datetime import datetime

import json


class Notification(models.Model):
    user  = models.ForeignKey('app.User',  on_delete=models.CASCADE)
    property = models.ForeignKey('app.Property', on_delete=models.CASCADE)
    review = models.ForeignKey('app.Review', on_delete=models.CASCADE, null=True)
    category = models.CharField(max_length=100, null=True)



    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)

    is_viewed = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)



    def __str__(self):
        return f"{str(self.category)} + ---- + {str(self.id)} + ----+ {self.is_deleted}"




# @receiver(post_save, sender = Notification)
# def send_Notification(sender, instance, created,  **kwargs):

    # if created:
    #     channel_layer = get_channel_layer()

    #     print(channel_layer)

    #     data = {}
    #     data['id'] = instance.id
    #     data['user_image'] = instance.user.profile.url
    #     data['user'] = f"{instance.user.first_name} {instance.user.last_name}"
    #     data['property_id'] =  instance.property.id
    #     data['bedroom'] = instance.property.bedroom
    #     data['property_type'] = instance.property.property_type
    #     data['property_category'] = instance.property.category
    #     data['city'] = instance.property.city
    #     data['category'] = instance.category
    #     data['property_user'] = instance.property.user.email
    #     data['response_user'] = instance.review.user.email

    
    #     created_date = instance.created_date

    #     print(created_date)


    #     data['created_date'] = created_date.strftime("%b %d, %Y")


    #     async_to_sync(channel_layer.group_send)(

    #         "user_%s" % instance.user.id, {
    #             'type': 'send_Notification_Message',
    #             'notification': data
    #         }
    #     )

    #     print("message has been sent")