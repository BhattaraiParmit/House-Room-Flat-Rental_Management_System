from django.shortcuts import render

from .models import *
from django.db.models import Q
from django.http import JsonResponse



def ReviewNotification(request):

    notifications = Notification.objects.filter(is_deleted = False).exclude(user = request.user)


    print(Notification)

     

    context = {
        'notifications': notifications,
    }


    return render(request, 'Notification/notification.html', context)






def deleteNotification(request):

    data = json.loads(request.body)

    id = data['id']

    notification = Notification.objects.get(id = id)

    notification.is_deleted = True

    notification.save()


    return JsonResponse('sucess', safe=False)

