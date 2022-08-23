from ast import Return
from asyncio import constants
from asyncio.windows_events import NULL
from email.mime import message
from multiprocessing import context
import pstats
import re
from tkinter.tix import ListNoteBook
from unicodedata import category, name
from urllib import request
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.db.models import Q
from .models import City, Property, Property_Image, Province, Review, SavedHomes, TotalStar, User, SoldProperty, ReviewMessage, RentedProperty, PayingGuestProperty
from .forms import propertyForm, MyPasswordChangeForm
from django.db.models import Max
from django.http import JsonResponse
from django.core.serializers import serialize
from decimal import Decimal as D
from .forms import RegistrationForm, profileUpdateForm
from django.http import HttpResponse
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings
import uuid
from django.contrib.auth.decorators import login_required
from .decorators import unauthenicated_user
from django.core.paginator import Paginator

import json


@unauthenicated_user
def loginPage(request):

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        print(email)
        print(password)

        user_obj = User.objects.filter(email = email).first()

        if user_obj is None:
            messages.success(request, 'User not found.')
            return redirect('login')
        
        

        if not user_obj.is_email_verified:
            messages.success(request, 'Profile is not verified check your mail.')
            return redirect('login')


        user = authenticate(email = email , password = password)

        if user is None:
            messages.success(request, 'Wrong password.')
            return redirect('login')
        

        login(request , user)
        return redirect('/')

    return render(request, 'app/login.html')





@unauthenicated_user
def registerPage(request):
    forms = RegistrationForm()

    if request.method == 'POST':

        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username  = request.POST.get('username')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        print(first_name)
        print(last_name)
        print(username)
        print(email)
        print(phone)
        print(password1)
        print(password2)

        try:
            if password1 != password2:
                print('same password')
                messages.success(request, 'password did not matched try again')
                return redirect('register')

            if User.objects.filter(username = username).first():
                messages.success(request, 'username already exist')
                return redirect('register')

        

            if User.objects.filter(email = email).first():
                messages.success(request, 'email already exist')
                return redirect('register')

            auth_token = str(uuid.uuid4())
            print('user start creating')
            user_obj = User(username = username, email = email, phone = phone, first_name = first_name, last_name = last_name, auth_token = auth_token)
            print('user not created')
            print('user star saving')
            user_obj.set_password(password1)
            print('user not saved')
            user_obj.save()
            print('user is saved')
         
            messages.success(request, 'email has been sent to your email account please verify to proceed login')
            subject = 'Your accounts need to be verified'
            message = f'Hi paste the link to verify your account http://127.0.0.1:8000/verify/{auth_token}'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [email]
            send_mail(subject, message , email_from , recipient_list)
            return redirect('register')

        except:
            print("eror during registration ")
            pass


    context = {'forms': forms}


    return render(request, 'app/register.html', context)



def verify(request , auth_token):
    try:
        profile_obj = User.objects.filter(auth_token = auth_token).first()
    

        if profile_obj:
            if profile_obj.is_email_verified:
                messages.success(request, 'Your account is already verified.')
                return redirect('login')

            profile_obj.is_email_verified = True
            profile_obj.save()
            messages.success(request, 'Your account has been verified.')
            return redirect('login')
        else:
            print("not validating")
    except Exception as e:
        print(e)
        return redirect('register')



def logoutPage(request):
    logout(request)
    
    return redirect('home')



def passwordChange(request):
   
    if request.method == "POST":

        form = MyPasswordChangeForm(user = request.user, data = request.POST)

        if form.is_valid():
            form.save()
            logout(request)
            
            return redirect('home')


    context = {
        'chanageForm': form
    }

    return render(request, 'app/profile_page.html', context)
 




@login_required(login_url='login')
def changePassword(request):

    form = MyPasswordChangeForm(user = request.user)

    if request.method == "POST":

        form = MyPasswordChangeForm(user = request.user, data = request.POST)

        if form.is_valid():
            form.save()
            logout(request)
            
            return redirect('home')


    context = {
        'chanageForm': form
    }

    return render(request, 'app/changePassword.html', context)






def Home_Page(request):
    registrationForm = RegistrationForm()
    property = Property.objects.all().order_by('-updated_date')[:9]

    province = Province.objects.filter(name__icontains = "Madhesh")
    city = City.objects.filter(name__icontains = 'kathmandu')


    print(province)
    print(city)



    i = 0

    for i in range(i, 3):
        for i in range(1, 2):
            print('j')
        
        print('i')
        i = i+1






    print(property)
    if request.user.is_authenticated:
        user = 'authenticated'
        
    else:
        user = 'unauthenticated'
       

    context = {
            # 'user': user,
            'registrationForm': registrationForm,
            'propertys': property, 
            }
   
    return render(request, 'app/home-page2.html', context)






def room_page(request):
    location  = request.GET.get('loc')

    # province = Province.objects.filter(name__icontains = location)
    # city = City.objects.filter(name__icontains = 'kathmandu')

    # print(city)

    forms = propertyForm()  

    rooms = Property.objects.filter(
        Q(province = location) | Q(city__icontains = location)

    ).order_by('-created_date')


    # for room in rooms:
    #     a = SavedHomes.objects.select_related().filter(property = room.id)

    #     print('----')

    #     print(room.id)
    #     print(a)
    #     print(room.savedhomes_set.filter(property__savedStatus = True, user = request.user))
    #     if(room.savedhomes_set.filter(property__savedStatus = True , user = request.user )):
    #         print('saved')
    #     else:
    #         print('false')
        # print()

    # rooms = Property.objects.all()

    # paginator = Paginator(rooms, 2)

    # print("---------", paginator.count)
    # print("---------", paginator.page_range)

    # page_number = request.GET.get('page')

    # print(page_number, '-----------------------')

    # data = paginator.get_page(page_number)


    # print("data+++++++++++", data.count)

    # print(data)
    context  = {
        'rooms': rooms,
        'forms': forms,
        'location': location,
        'query': request.GET.get('loc')
    }


    return render(request, 'app/rooms2.html', context)




# Get Homes from home-page homes-section
def getHomes(request, location):

    forms = propertyForm()

    rooms = Property.objects.filter(
        Q(province__icontains = location) | Q(city__icontains = location)
    )


    context  = {
        'rooms': rooms,
        'forms': forms,
        'location': location
    }
    return render(request, 'app/rooms2.html', context)



import datetime


@login_required(login_url='login')
def room_detail(request, pk):

    

    if request.method == 'POST':
        print("post-----------------------")
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        phone = request.POST.get('phone')
        email = request.user.email
        mssg = request.POST.get('mssg_body')


        print(first_name)
        print(last_name)
        print(mssg)

        print(email)

        subject = '{} {} ({})'.format(first_name, last_name, phone)
        message = f'Hi {first_name} {last_name} was intrested in your property http://127.0.0.1:8000/room_detail/{pk}'

        send_mail(
            subject, message, 'pramitbhattarai3017@gmail.com', [email] 
        )

        messages.success(request, 'Your email was successfully sent to landlord')




    property = Property.objects.get(id = pk)
    room_images = Property_Image.objects.filter(Property = property)
    property_address = property.city

    otherProperties = Property.objects.filter(city__icontains= property_address).exclude(id = pk)


    review = Review.objects.filter(Property = property)

    
    try:

        totalRating = TotalStar.objects.get(property = property)
      
        totalstar = totalRating.totalStar


    except:
        totalstar = 0




    room_image = serialize("json", room_images)
    json_data = json.loads(room_image)

    for i in json_data:
        id = i['pk']
        propertyImage = Property_Image.objects.get(id = id)
        i['fields']['dummyImage'] = propertyImage.image.url

    
    reviews = serialize("json", review)

    data = json.loads(reviews)




    for i in data:
        review_id  = i['pk']

        r = Review.objects.get(id = review_id)



        review_response = r.reviewmessage_set.filter(review = r)



        print(review_response)

        last_new_record = r.reviewmessage_set.filter(review = r).first()

        try:
            date = last_new_record.updated_date
            updated_date =  date.strftime("%b %d, %Y")

            print(updated_date)

        except:
            updated_date = ''



        i['fields']['email'] = r.user.email

        i['fields']['full_name'] = "{} {}".format(r.user.first_name, r.user.last_name)
        i['fields']['reply_message_count'] = review_response.count()

        
        updated_date = i['fields']['created_date']

        d = datetime.strptime(updated_date, '%Y-%m-%dT%H:%M:%S.%fZ')

        i['fields']['date'] = d.strftime("%b %d, %Y")
        
        i['fields']['updated_date'] =  d.strftime("%b %d, %Y")


    context = {
        'room': property,
        'room_images': json.dumps(json_data),
        'similarProperty': otherProperties,
        'reviews':  review,
        'rating': json.dumps(data),
        'pk': pk,
        'user': request.user,
        'images': room_images,
        'totalStar': totalstar,
        'room_owner': property.user,
        
        
        }



    return render(request, 'app/room-detail-2.html', context)





@login_required(login_url='login')
def PostProperty(request):

    if request.user.is_authenticated:
        forms = propertyForm()
        province = Province.objects.all()
        city = City.objects.all()

        context =  {
            'forms': forms,
            'provinces': province,
            'citys': city
            }
    else:
        context = {'forms': "anonymousUser"}

    return render(request, 'app/post_property2.html', context )




from django.core.files import File

def newPostData(request):

    # print(request.POST)

    images = request.FILES.getlist('images')

    security = request.POST.get("security")

    phone_number  =  request.POST.get("phone_number")

    user = request.user

    if user.phone:
        pass

    else:
        user.phone = phone_number
        user.save()



    print("number",  user.phone)

 
    property = Property.objects.create(
        user = request.user,
        category =  request.POST.get("category"),
        property_type =  request.POST.get("type"),
        area = request.POST.get("area"),
        security_deposite = request.POST.get("security_deposite"),

        province = request.POST.get("province"),
        # province = province,
        city = request.POST.get("city"),
        # city = city,
        
        negotiable =  request.POST.get("negotiable"),
        furnishing = request.POST.get("furnishing"),
        age_of_property = "1-2 year",
        rent_out_to =  request.POST.get("rent_out_to"),
        bedroom = request.POST.get("bedroom"),
        bathroom = request.POST.get("bathroom"),
        balconies =  request.POST.get("balconies"),
        price = request.POST.get("rent"),
        description = request.POST.get("description"),
        # security_deposite = request.POST.get("security"),
        cover_image = request.FILES.get('cover_images'),
        video = request.FILES.get('videos'),

        lease_duration = request.POST.get("lease_duration"),
        pets = request.POST.get("pet"),  
        parking = request.POST.get("parking"),

        air_condition =  request.POST.get("air_conditioner"),
        electricity = request.POST.get("electricity"),
        water = request.POST.get("water"),
        fans = request.POST.get("fans"),
        no_smoking = request.POST.get("smoking"),
        internet = request.POST.get("internet"),
    )

    property.save()


    print(property.id)

    if images:

        print("+================")

        property_obj = Property.objects.get(id = property.id )
        print("+================")

        image_length = len(images)

        print(image_length)

        for obj in images:
            Property_Image.objects.create(
                Property = property_obj,
                image = obj
            )

        print("+====== llllllllllllll==========")

        if image_length < 5:
            print("less")
            print("+================")

            length = 4 - image_length
            for i in range(length):
                abc = Property_Image(Property = property_obj)
                abc.image.save('home-backgroundImage.png', File(open('static/images/home-backgroundImage.png', 'rb',)))

    else:
        print('empty')

    

    return JsonResponse("suceess", safe=False)





def postData(request):

    images = request.FILES.getlist('images')
    
    property = Property.objects.create(
        user = request.user,
        category = request.POST.get("category"),
        property_type =request.POST.get("type"),
        address = request.POST.get("address"),
        negotiable = request.POST.get("negotiable"),
        furnishing = request.POST.get("furnishing"),
        age_of_property = request.POST.get("age"),
        rent_out_to = request.POST.get("rent_out_to"),
        bedroom = request.POST.get("bedroom"),
        bathroom = request.POST.get("bathroom"),
        balconies = request.POST.get("balconies"),
        price = request.POST.get("price"),
        description = request.POST.get("description"),
        security_deposite = request.POST.get("security"),
        cover_image = request.FILES.get('cover_images')
    )
    
    property.save()

    if images:
        property_obj = Property.objects.get(id = property.id)
        
        for obj in images:
            Property_Image.objects.create(
                Property = property_obj,
                image = obj
            )
    else:
        print('empty')


    context = {'id': property.id}


    return JsonResponse(context, safe=False)






def filterData(request):

    data  = json.loads(request.body)


    minimum_price = data['minimum_price']
    maximum_price = data['maximum_price']
    location  = data['location']
    bedroom = data['bedroom']
    property_type = data['property_type']
    Furnishing = data['furnishing_value']
    rent_out_to = data['rent_out_to']
    sort_value = data['sort_value']
    category_value = data['category_value']


    print('-------------', location)


    if minimum_price != '':
        minimum_price = int(minimum_price)
    else:
        minimum_price = 0

    if maximum_price == '':
        maximum_price =  maximum_price = Property.objects.aggregate(Max('price'))['price__max']  
    
    else:
        maximum_price = int(maximum_price)




    if sort_value == 'newest':
        
        rooms = Property.objects.filter(
            Q(city__icontains = location) &
            Q(bedroom__icontains = bedroom) & 
            Q(property_type__icontains = property_type) &
            Q(furnishing__icontains = Furnishing) &
            Q(rent_out_to__icontains = rent_out_to) &
            Q(category__icontains = category_value) &
            Q(price__range = (minimum_price, maximum_price))
        ).order_by('-created_date')



    elif sort_value == 'low_to_high':
        rooms = Property.objects.filter(
            Q(city__icontains = location) &
            Q(bedroom__icontains = bedroom) & 
            Q(property_type__icontains = property_type) &
            Q(furnishing__icontains = Furnishing) &
            Q(rent_out_to__icontains = rent_out_to) &
            Q(category__icontains = category_value) &
            Q(price__range = (minimum_price, maximum_price))
        ).order_by('price')


    
    elif sort_value == 'high_to_low':
        print("hello--------------")
        
        rooms = Property.objects.filter(

            Q(city__icontains = location) &
            Q(bedroom__icontains = bedroom) & 
            Q(property_type__icontains = property_type) &
            Q(furnishing__icontains = Furnishing) &
            Q(rent_out_to__icontains = rent_out_to) &
            Q(category__icontains = category_value) &
            Q(price__range = (minimum_price, maximum_price))
        ).order_by('-price')


    
    else:
       

        rooms = Property.objects.filter(
            Q(city__icontains = location) &
            Q(bedroom__icontains = bedroom) & 
            Q(property_type__icontains = property_type) &
            Q(furnishing__icontains = Furnishing) &
            Q(rent_out_to__icontains = rent_out_to) &
            Q(category__icontains = category_value) &
            Q(price__range = (minimum_price, maximum_price))
            
        )


    print(rooms)


    for room in rooms:
        room.cover_image = room.imageURL



    qs = serialize("json", rooms)



    json_data = json.loads(qs)

    for i in json_data:
        pk  = i['pk']

        property = Property.objects.get(id = pk)
        i['fields']['user'] = property.user.name

        updated_date = i['fields']['created_date']
      
        d = datetime.strptime(updated_date, '%Y-%m-%dT%H:%M:%S.%fZ')

        i['fields']['date'] = d.strftime("%b %d, %Y")


        

        if request.user.is_authenticated:

            if property.savedhomes_set.filter(user = request.user, property = pk): 
                i['fields']['saved_status'] = True
            else:
                i['fields']['saved_status'] = False

        else:
            i['fields']['saved_status'] = False


            

   


    context = {
        'rooms': json.dumps(json_data),

        }
   


    return JsonResponse( context, safe=False)








def properties(request):

    label = request.GET.get('label')

    if label != None:
        
        try:
            user = request.user
            property = Property.objects.filter(
                Q(user = user)&
                Q(city__icontains = label)|
                Q(province__icontains = label)
            )


            context = {
                'property': property,
                'user': user,
                'id': user.id,
                'propertyCount': property.count
            }

        except:

            context = {
                'property': '',
                'id': '',
                'propertyCount': 0
            }

        
    else:
        try:
            user = request.user

            property = Property.objects.filter(user = user)

            context = {
                'property': property,
                'user': user,
                'id': user.id,
                'propertyCount': property.count

            }

        except:

            context = {
                'property': '',
                'id': '',
                'propertyCount': 0
            }


    
    return render(request, 'app/properties.html', context)







def profilePage(request, pk):

    user = User.objects.get(id=pk)

    forms = profileUpdateForm(instance=user)

    passwordChangeForm = MyPasswordChangeForm(user = request.user)

    if request.method == 'POST':

        forms = profileUpdateForm(request.POST, request.FILES, instance=user)
        print(forms)

        if forms.is_valid():
            forms.save()
            # return redirect('home')


    context = {'forms': forms, 'user': user, 'passwordChangeForm': passwordChangeForm}


    return render(request, 'app/profile_page.html', context)






def editProperty(request, pk):
    
    user = request.user
    property = Property.objects.get(id = pk)
    forms = propertyForm(instance=property)
    cover_image = property.cover_image.url

    video_url = property.videoURL
    video = property.video

    propertyImage = Property_Image.objects.filter(Property = property)


    qs = serialize("json", propertyImage)

    json_data = json.loads(qs)

    for i in json_data:
        id = i['pk']
        propertyImage = Property_Image.objects.get(id = id)
        i['fields']['dummyImage'] = propertyImage.image.url
        


    
    context = {
        'forms': forms,
        'propertyImage': json.dumps(json_data),
        'cover_image': cover_image,
        'id': pk,
        'video_url': video_url,
        'video': video
        
    }

    return render(request, 'app/edit_property.html', context)






def editFunction(request, property, images2,  deletedImages, deleted_video,  coverIimage):
    
    if request.method == 'POST':

        property.user = request.user
        property.category =  request.POST.get("category")
        property.property_type =  request.POST.get("type")
        property.area = request.POST.get('area')
        property.address =  request.POST.get("address")
        property.negotiable =  request.POST.get("negotiable")
        property.furnishing = request.POST.get("furnishing")
        property.age_of_property = "1-2 year"
        property.rent_out_to =  request.POST.get("rent_out_to")
        property.bedroom = request.POST.get("bedroom")
        property.bathroom = request.POST.get("bathroom")
        property.balconies =  request.POST.get("balconies")
        property.price = float(request.POST.get("rent"))
        property.description = request.POST.get("description")
        property.security_deposite = float(request.POST.get("security_deposite"))
        property.cover_image = coverIimage

        property.lease_duration = request.POST.get("lease_duration")
        property.pets = request.POST.get("pet")
        property.parking = request.POST.get("parking")

        property.air_condition =  request.POST.get("air_conditioner")
        property.electricity = request.POST.get("electricity")
        property.water = request.POST.get("water")
        property.fans = request.POST.get("fans")
        property.no_smoking = request.POST.get("smoking")
        property.internet = request.POST.get("internet")

        property.save()

        # if deleted_video == '':
        #     return
        # else:
        #     property.

        print('--------------------------------')
        print("deletedImage", deletedImages)

        if deletedImages:
            for i in deletedImages:
                propety_image = Property_Image.objects.get(id  = i)
                propety_image.delete()

      
        if images2:
             for i in images2:
                Property_Image.objects.create(
                    Property = property,
                    image = i
                )

        print("saved")


        

def saveEditedProperty(request):
    
    id = request.POST.get('id')


    property = Property.objects.get(id = id)


    images = request.POST.getlist('images')
    images2 = request.FILES.getlist('images')


    print(images2)

    video1 = request.FILES.getlist('videos')
    video2 = request.POST.getlist('videos')

    deletedImages = request.POST.getlist('deletedImages')
    deleted_video = request.POST.get('deleted_video_id')
    print(deleted_video)

    print(deletedImages)
    print("deletedImage----", deletedImages)


    print('deleted_video', deleted_video)
    
    
    if deleted_video == '':
        print('epty')
    else:
        print('not null')
    

    print("videos", video1)
    print("videos", video2)
    

    cover_image1 = request.POST.getlist('cover_images')
    cover_image2 = request.FILES.getlist('cover_images')


    print("coverimage1", cover_image1)
    print("coverImage2", cover_image2)



    if cover_image1:
        editFunction(request, property, images2, deletedImages, deleted_video,cover_image1[0])
    
    if cover_image2:
        editFunction(request, property, images2, deletedImages, deleted_video, cover_image2[0])

    if video1:
        property.video = video1[0]
        property.save()



    else:
        if video2[0] == 'undefined':

            property.video.delete()
            property.save()

            print("removing video due to udefined")

        elif video2[0] != None:
            property.video = video2[0]
            property.save()

            print('adding  video from video2')
        
        else:
            property.video.delete()
            property.save()
            print('removing  video from video2')



    return JsonResponse('success', safe=False)






def deleteProperty(request, pk):

    property = Property.objects.get(id = pk)
    property.delete()
    
    return redirect('property-list')





def postReview(request):
    print("------------------------------")

    data = request.POST
    
    id = data['id']

    totalrating = 0

    totalstar = int(data['rating'])

    property = Property.objects.get(id = id)
    print("-++++++++++++++++++++++++++++++++++=")
    print("================================================")
    
    print(request.user)
    
    review =  Review.objects.create(
        user = request.user,
        Property = property,
        title = data['header'],
        rating = data['rating'],
        message = data['message']
    )
    review.save()

    print("================================================")
    
    totalStar, created = TotalStar.objects.get_or_create(property = property)
    totalrating = int(totalStar.totalStar + int(data['rating']))


    totalStar.totalStar = totalrating
    totalStar.save()



    r = Review.objects.filter(id = review.id)


    print("-++++++++++++++++++++++++++++++++++=")

    data = serialize('json', r)
    json_data = json.loads(data)

   
    for i in json_data:
        review_id  = i['pk']

        r = Review.objects.get(id = review_id)

        i['fields']['email'] = r.user.email

        i['fields']['full_name'] = "{} {}".format(r.user.first_name, r.user.last_name)

        updated_date = i['fields']['created_date']

        d = datetime.strptime(updated_date, '%Y-%m-%dT%H:%M:%S.%fZ')

        i['fields']['date'] = d.strftime("%b %d, %Y")




    totalReview = Review.objects.filter(Property = property)

 
    context = {
        'id': id,
        'review': json.dumps(json_data),
        'totalStar': json.dumps(totalStar.totalStar),
        'totalReview': totalReview.count()
    }

    return JsonResponse(context, safe=False )





@login_required(login_url='login')
def savedHomes(request):

    data = json.loads(request.body)

    property = Property.objects.get(id = data['id'])

    savedhomes = SavedHomes.objects.filter(user = request.user, property = property)

    if savedhomes:

        savedhomes.delete()

    else:
        print('saved')

        # property.savedStatus = False
        saved = SavedHomes.objects.create(
            user = request.user,
            property = property
        )

        saved.save()

        

    # if property.savedStatus == False:
    #     print('not saved')
    #     property.savedStatus = True
    #     property.save()

    #     savedhomes = SavedHomes.objects.create(
    #         user = request.user,
    #         property = property
    #     )

    #     savedhomes.save()

    # elif property.savedStatus == True:

    #         print('saved')

    #         property.savedStatus = False

    #         savedhomes = SavedHomes.objects.filter(user = request.user, property = property)

    #         savedhomes.delete()
    #         property.save()


    return JsonResponse('sucess', safe=False)





def savedHomesSection(request):


    label = request.GET.get('label')


    if label != None:

        try:
            savedHomes  = SavedHomes.objects.filter(
                    Q(user = request.user) &
                    Q(property__city__icontains = label) |
                    Q(property__province__icontains = label)
                    )

            print(savedHomes)

            savedHomesCount = savedHomes.count

        except:

            savedHomes = ''
            savedHomesCount = 0

        context = {
            'savedhomes': savedHomes,
            'id': request.user.id,
            'savedHomesCount': savedHomesCount
        }
        

    else:

        try:
            savedhomes = SavedHomes.objects.filter(user = request.user)
            savedHomesCount = savedhomes.count

        except:
            savedhomes = ''
            savedHomesCount = 0

        context = {
            'savedhomes': savedhomes,
            'savedHomesCount': savedHomesCount
        }
    
    
    
    return render(request, 'app/saved_homes.html', context)





def getBuyandSaleHomes(request, category):

    property = Property.objects.filter(category = category)


    forms = propertyForm()

    paginator = Paginator(property, 8)
    page_number = request.GET.get('page')

    print(page_number)

    data = paginator.get_page(page_number)


    context = {
        'rooms': data, 
        'forms': forms,
        'category': category
    }
    
    return render(request, 'app/rooms2.html', context)







def searchHomes(request):
    property = Property.objects.all()
    forms = propertyForm()


    context = {
        'rooms': property,
        'forms': forms,
        'location': ''
    }

    return render(request, 'app/rooms2.html', context)




def getNewHomes(request):
    forms = propertyForm()

    property = Property.objects.all().order_by('-created_date')

    context = {
        'rooms': property,
        'forms': forms,
        'location': ''
    }

    return render(request, 'app/rooms2.html', context)






def getRecentlySoldHomes(request):
    forms = propertyForm()

    # property = Property.objects.filter

    context = {
        'rooms': property,
        'forms': forms,
        'location': ''
    }
    return render(request, 'app/rooms2.html', context)



def getPropertyByType(request, type):

    print(type)

    property = Property.objects.filter(property_type__icontains = type, category = 'Rent')
    forms = propertyForm()

    context = {
        'rooms': property,
        'forms': forms
    }

    return render(request, 'app/rooms2.html', context)



from datetime import datetime

def getPropertyByCategory(request):

    data = json.loads(request.body)
    user = request.user

    status = data['type']

    
    if status == 'all':
        property = Property.objects.filter(user = user)
        

    elif status == 'Active':
        property = Property.objects.filter(
            Q(user = user) &
            Q(soldStatus = False)&
            Q(rentedStatus = False)&
            Q(payingGuestStatus = False)
        )


    elif status == 'Sold':
        property = Property.objects.filter(
            Q(user = user) &
            Q(soldStatus = True)
        )

    elif status == 'Rented':
        property = Property.objects.filter(
            Q(user = user) &
            Q(rentedStatus = True)
        )

    elif status == 'Booked':
        property = Property.objects.filter(
            Q(user = user) &
            Q(payingGuestStatus = True)
        )
        
    



    qs = serialize('json', property)

    data = json.loads(qs)

    for i in data:
        pk  = i['pk']
        property = Property.objects.get(id = pk)
        i['fields']['Image'] = property.cover_image.url
        updated_date = i['fields']['created_date']
      
        d = datetime.strptime(updated_date, '%Y-%m-%dT%H:%M:%S.%fZ')
        i['fields']['date'] = d.strftime("%b %d, %Y")


        rented_status = property.rentedStatus
        sold_status = property.soldStatus
        paying_Guest_Status = property.payingGuestStatus


        if rented_status == True or sold_status == True or paying_Guest_Status == True:

            if  rented_status == True:
                i['fields']['property_status'] = 'Rented'
                i['fields']['class_Name'] = 'sold'
                
            elif sold_status == True:
                i['fields']['property_status'] = 'Sold'
                i['fields']['class_Name'] = 'sold'

            elif paying_Guest_Status == True:

                i['fields']['property_status'] = 'Booked'
                i['fields']['class_Name'] = 'sold'

        else:
            i['fields']['property_status'] = 'Active'
            i['fields']['class_Name'] = 'rent'



    context  = {'property':json.dumps(data)}


    return JsonResponse(context, safe=False)





def getSavedPrpertyByCategory(request):
    data = json.loads(request.body)
    user = request.user

    type = data['type']


    if type == 'all':
        property = SavedHomes.objects.filter(user = user)
        print(property)
        

    elif type == 'Rent':
        print("hello")

        property = SavedHomes.objects.filter(user = user, property__category__icontains = type)

        print(property)

    elif type == 'Sell':
    
        property = SavedHomes.objects.filter(user = user, property__category__icontains = type)


    elif type == 'Sold':
        property = SavedHomes.objects.filter(user = user, property__soldStatus = True)




    qs = serialize('json', property)

    data = json.loads(qs)

    for i in data:
        pk  = i['pk']

        property = SavedHomes.objects.get(id = pk)
        i['fields']['Image'] = property.property.cover_image.url
        i['fields']['bedroom'] = property.property.bedroom
        i['fields']['bathroom'] = property.property.bathroom
        i['fields']['area'] = property.property.area
        i['fields']['description'] = property.property.description
        i['fields']['city'] = property.property.city
        i['fields']['category'] = property.property.category
        i['fields']['type'] = property.property.property_type
        i['fields']['soldstatus'] = property.property.soldStatus
        i['fields']['roomid'] = property.property.id
        i['fields']['price'] = property.property.price

        updated_date = i['fields']['created_date']
      
        d = datetime.strptime(updated_date, '%Y-%m-%dT%H:%M:%S.%fZ')
        i['fields']['date'] = d.strftime("%b %d, %Y")



        rented_status = property.property.rentedStatus
        sold_status = property.property.soldStatus
        paying_Guest_Status = property.property.payingGuestStatus


        if rented_status == True or sold_status == True or paying_Guest_Status == True:

            if  rented_status == True:
                i['fields']['property_status'] = 'Rented'
                i['fields']['class_Name'] = 'rented'
                
            elif sold_status == True:
                i['fields']['property_status'] = 'Sold'
                i['fields']['class_Name'] = 'sold'

            elif paying_Guest_Status == True:

                i['fields']['property_status'] = 'Booked'
                i['fields']['class_Name'] = 'sold'

        else:
            category = property.property.category

            if category == "Rent":
                i['fields']['property_status'] = 'For Rent'
                i['fields']['class_Name'] = 'rent'


            elif category == 'Sell':
                i['fields']['property_status'] = 'For Sell'
                i['fields']['class_Name'] = 'sell'


            elif category == 'PG':
                i['fields']['property_status'] = 'PG'
                i['fields']['class_Name'] = 'pg'








    context  = {'property':json.dumps(data)}

    
    return JsonResponse(context, safe=False)





def getSearchListing(request):

    label = request.GET.get('label')



    
    if label.lower() == 'sold':
        property = Property.objects.filter(user = request.user, soldStatus = True)
    
    elif label.lower() == 'rent':

        property = Property.objects.filter(user = request.user, soldStatus = False)

    else:
        property = Property.objects.filter(
            Q(user = request.user) &
            Q(city__icontains = label) | 
            Q(province__icontains = label) 
        )

        print(property)

    context = {
        'property': property,
        'id': request.user.id
    }


    return render(request, 'app/properties.html', context)





def getSavedPropertySearch(request):

    label = request.GET.get('label')
 
    try:
    
        if label.lower() == 'sell':
            savedHomes  = SavedHomes.objects.filter(user = request.user, property__category = 'Sell')
            # property = Property.objects.filter(user = request.user, soldStatus = True)
        
        elif label.lower() == 'rent':
            savedHomes  = SavedHomes.objects.filter(user = request.user, property__category = 'Rent')
            # property = Property.objects.filter(user = request.user, category = 'Rent')

        elif label.lower() == 'sold':
            savedHomes  = SavedHomes.objects.filter(user = request.user, property__soldStatus = True)
            # property = Property.objects.filter(user = request.user, category = 'Rent')

        elif label.lower() == 'rented':
            savedHomes  = SavedHomes.objects.filter(user = request.user, property__rentedStatus = True)
            # property = Property.objects.filter(user = request.user, category = 'Rent')

        else:
            savedHomes  = SavedHomes.objects.filter(
                user = request.user &
                Q(property__city__icontains = label) |
                Q(property__province__icontains = label)
                
                )

            # property = Property.objects.filter(
            #     Q(user = request.user) &
            #     Q(city__icontains = label) | 
            #     Q(province__icontains = label) 
            # )
            print(savedHomes)

        
        property_count = savedHomes.count

    except:

        savedHomes = ''
        property_count = 0


    # context = {
    #     'property': property,
    #     'id': request.user.id,
    #     'savedHomesCount': property.count
    # }

    context = {
        'savedhomes': savedHomes,
        'id': request.user.id,
        'savedHomesCount': property_count
    }


    return render(request, 'app/saved_homes.html', context)
    

    


def sendEmail(request):
    
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')

        send_mail(
            first_name, last_name, 'pramitbhattarai3017@gmail.com', [email] 
        )

        messages.success(request, 'Your email was successfully sent to landlord', fail_silently=True)

        context = {'message': message}
        print(first_name, last_name, phone, email)

    return render(request, 'app/room-detail-2.html', context)
    # return HttpResponse("{}--{}--{}--{}".format(first_name, last_name, phone, email))



def getSoldHomes(request):

    forms = propertyForm()

    rooms = Property.objects.filter(soldStatus = True )

    context = {
        'rooms': rooms,
        'forms': forms
        
        }
    return render(request, 'app/rooms2.html', context)



def soldProperty(request):

    data = json.loads(request.body)
    property = Property.objects.get(id = data['id'])

    
    classTag = ''
    statusLabel = ''

    category = property.category


    if category == 'Rent':

        if property.rentedStatus == False:

            property.rentedStatus = True
            property.save()

            RentedProperty.objects.create(
                user = request.user,
                property = property
            )

            classTag = 'sold'
            statusLabel = 'Rented'

        else:
            property.rentedStatus = False
            property.save()

            rentedProperty = RentedProperty.objects.filter(user = request.user, property = property)
            rentedProperty.delete()

            classTag = 'rent'
            statusLabel = 'Active'



    
    elif category == 'Sell':

        if property.soldStatus == False:

            property.soldStatus = True
            property.save()

            SoldProperty.objects.create(
                user = request.user,
                property = property
            )

            classTag = 'sold'
            statusLabel = 'Sold'


        else:
            property.soldStatus = False
            property.save()

            soldProperty = SoldProperty.objects.filter(user = request.user, property = property)
            soldProperty.delete()

            classTag = 'rent'
            statusLabel = 'Active'


    elif category == 'PG':
        if property.payingGuestStatus == False:

            property.payingGuestStatus = True
            property.save()

            PayingGuestProperty.objects.create(
                user = request.user,
                property = property
            )

            classTag = 'sold'
            statusLabel = 'Booked'


        else:
            property.payingGuestStatus = False
            property.save()

            paying_Guest_Property = PayingGuestProperty.objects.filter(user = request.user, property = property)
            paying_Guest_Property.delete()


            classTag = 'rent'
            statusLabel = 'Active'


    return JsonResponse({'status': [classTag, statusLabel]}, safe=False)





def deleteReview(request):

    print("hello")

    data = json.loads(request.body)

    id = data['id']
    review_star = data['review_star']

    print(review_star)

    property = Property.objects.get(id = data['property_id'])


    totalstar = TotalStar.objects.get(property = property)

    print(totalstar)

    totalstar.totalStar = int(totalstar.totalStar) - int(review_star)
    totalstar.save()


    review = Review.objects.get(id = id)
    review.delete()


    totalReview = Review.objects.filter(Property = property)


    context = {
        'totalStar': totalstar.totalStar,
        'totalReview': totalReview.count()
    }


    return JsonResponse(context, safe=False)







def deleteSavedHomes(request, pk):

    homes  = SavedHomes.objects.get(id = pk)

    property_id = homes.property.id
    property = Property.objects.get(id = property_id)
    property.savedStatus = False
    property.save()


    homes.delete()


    return redirect('savedHomesSection')




def getCityFromProvinceName(request):

    data = json.loads(request.body)

    province = Province.objects.get(id = data['id'])


    city = City.objects.filter(province = province)


    data = serialize('json', city)

    
    context = {
        'city': data
    }
    
    return JsonResponse(context, safe=False)




def getEditPropertyCityName(request):

    data = json.loads(request.body)

    province = Province.objects.get(name  = data['value'])

    city = City.objects.filter(province = province)

    data = serialize('json', city)

    context = {
        'city': data
    }

    return JsonResponse(context, safe=False)




def submitReviewMessage(request):

    data = json.loads(request.body)

    id = data['id']
    mssg = data['mssg']

    review = Review.objects.get(id = id)

    message = ReviewMessage.objects.create(
        review = review,
        message  = mssg
    )

    message.save()


    print(message.id)



    replay_message = ReviewMessage.objects.filter(id = message.id)
    # replay_message = ReviewMessage.objects.filter(review = review)


    q = serialize('json', replay_message)


    json_data = json.loads(q)


    context = {
        'replay_message': json.dumps(json_data)
    }



    return JsonResponse(context, safe=False)






def getReviewReply(request):

    data = json.loads(request.body)

    print(data['id'])

    review = Review.objects.get(id = data['id'])
    

    response_message = ReviewMessage.objects.filter(review = review)

    print(response_message)


    q = serialize('json', response_message)

    json_data = json.loads(q)



    context = {
        'replay_message': json.dumps(json_data)

    }


    return JsonResponse(context , safe=False)





def getGeneralProperty(request):

    property  = Property.objects.filter(
        soldStatus = False,
        rentedStatus = False,
        payingGuestStatus = False
    )



    context = {
        'rooms': property
    }

    return render(request, 'app/rooms2.html', context)





# def ReviewNotification(request):

#     return render(request, 'app/notification.html')


    




