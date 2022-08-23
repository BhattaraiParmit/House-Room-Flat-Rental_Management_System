"""
ASGI config for Rental project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from django.urls import path
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from app.consumers import *
from notification.consumers import *




os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Rental.settings')

application = get_asgi_application()

ws_pattern = [
    # path('ws/notification/<user_id>/', get_All_Posted_Review.as_asgi()),
    path('ws/notification/', get_All_Posted_Review.as_asgi()),
    # path('ws/<user_id>/', ReviewSectionBox.as_asgi()),

    
]


application = ProtocolTypeRouter({
    
    'websocket': AuthMiddlewareStack(
        URLRouter(ws_pattern)
    )
})
