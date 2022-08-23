from . import views
from django.urls import path



app_name = 'notification'

urlpatterns = [
    path('notification/', views.ReviewNotification, name='notification'),

    path('deleteNotification/', views.deleteNotification, name="deleteNotification"),
]