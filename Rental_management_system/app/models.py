
from pyexpat import model
from unicodedata import category
from urllib import request
from django.db import models
from django.contrib.auth.models import AbstractUser
from notification.models import Notification

from django.db.models.signals import post_save
from channels.layers import get_channel_layer
from django.dispatch import receiver
from asgiref.sync import async_to_sync



CATEGORY = (
    ('Rent', 'Rent'),
    ('Sell', 'Sell'),
    ('PG', 'PG'),
)



PROPERTY_TYPE = (
    ('Apartment', 'Apartment'),
    ('House', 'House'),
    ('Room', 'Room'),
    ('Flat', 'Flat'),
)

NEGOTIABLE  = (
    ('Negotiable', 'Negotiable'),
    ('Not Negotiable', 'Not Negotiable'),
)

FURNISHING = (
    ('Furnished', 'Furnished'),
    ('Semi Furnished', 'Semi Furnished'),
    ('Un-Furnished', 'Un-Furnished'),
)

AGE_OF_PROPERTY = (
    ('0-1 years', '0-1 years'),
    ('1-5 years', '1-5 years'),
    ('5-10 years', '5-10 years'),
    ('10+ years', '10+ years'),
)

RENT_OUT_TO = (
    ('Any', 'Any'),
    ('Family', 'Family'),
    ('Men', 'Men'),
    ('Girls', 'Girls'),
)

SECURITY_DEPOSIT = (
    ('Fixed', 'Fixed'),
    ('Multiple of Rent', 'Multiple of Rent'),
    ('None', 'None')
)

BEDROOM = (
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
  
)

BATHROOM = (
    ('0', '0'),
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
  
)

BALCONIES = (
    ('0', '0'),    
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
   
)

LEASE_DURATION = (
    ('1 month', '1 month'),
    ('6 month', '6 month'),
    ('1 year', '1 year'),
    ('2 year', '2 year'),
    ('3 year', '3 year'),
)

PETS = (
    ('No pets allowed', 'No pet allowed'),
    ('Cats allowed', 'Cats allowed'),
    ('dogs allowed', 'dogs allowed'),
    ('Both cats and dog allowed', 'Both cats and dog allowed')
)

PARKING = (
    ('Steet', 'Street'),
    ('Garage', 'Garage'),
    ('Only Bike', 'Only Bike'),
    ('Car', 'Car'),
    ('Both car and Bike', 'Both car and Bike'),
)


AIRCONDITIONER = (
    ('Air Conditioner', 'Air Conditioner'),
    ('Heater', 'Heater'),
)

PROVINCE = (
    ('Province 1', 'Province 1'),
    ('Madhesh Province', 'Madhesh Province'),
    ('Bagmati Province', 'Bagmati Province'),
    ('Gandaki Province', 'Gandaki Province'),
    ('Lumbini Province', 'Lumbini Province'),
    ('Karnali Province', 'Karnali Province'),
    ('Sudurpashchim Province', 'Sudurpashchim Province'),
)

CITY = (
    ('Kathmandu', 'Kathmandu'),
    ('Pokhara', 'Pokhara'),
    ('Bhaktapur', 'Bhaktapur'),
    ('Lalitpur', 'Lalitpur'),
    ('Butwal', 'Butwal'),
    ('Narayanghat', 'Narayanghat'),
    ('Hetauda', 'Hetauda'),
    ('Dharan', 'Dharan'),
    ('Illam', 'Illam'),
    ('Nepalghunj', 'Nepalghunj'),
    
)






class User(AbstractUser):
    name  = models.CharField(max_length=100, null=True)
    email = models.EmailField(null=True, unique=True)
    profile = models.ImageField(null=True, default = 'room_image1.jpg')
    phone = models.CharField(max_length=10)
    auth_token = models.CharField(max_length=100, null=True)

    is_email_verified = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email


    @property
    def imageURL(self):
        try:
            url = self.profile.url
        except:
            url = ''

        return url




class Province(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name



class City(models.Model):
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)


    def __str__(self):

        return self.name
        # return str(self.province.name+'---'+ self.name)





class Property(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    category = models.CharField(choices=CATEGORY, max_length=100, null=True, blank=False, default='Rent')
    property_type = models.CharField(max_length=100, choices=PROPERTY_TYPE, null=True, blank=False, default= 'Apartment')
    area = models.CharField(max_length=20, null=True)

    province = models.CharField(max_length=50, choices=PROVINCE, null=True)
    city = models.CharField(max_length=20, choices=CITY, null=True)

    # province = models.ForeignKey(Province, on_delete=models.CASCADE )
    # city = models.ForeignKey(City, on_delete=models.CASCADE)

    negotiable = models.CharField(max_length=100, choices=NEGOTIABLE, null=True, blank=False, default= 'Negotiable')
    furnishing = models.CharField(max_length=100, choices=FURNISHING, null=True, blank=False, default= 'Furnished')
    age_of_property = models.CharField(max_length=50, choices=AGE_OF_PROPERTY, null=True, blank=False,  default= '0-1 years')
    rent_out_to = models.CharField(max_length=50, choices=RENT_OUT_TO, null=True, blank= False, default="Any")
    security_deposite = models.FloatField(null=True)
    # security_deposite = models.CharField(max_length=100, choices=SECURITY_DEPOSIT, null=True, blank=False, default="None")
    bedroom = models.CharField(max_length=2, choices=BEDROOM, blank=False, default="3")
    bathroom = models.CharField(max_length=2, choices=BATHROOM, blank=False,  default="0")
    balconies = models.CharField(max_length=2, choices=BALCONIES, blank=False,  default="0")
    lease_duration = models.CharField(max_length=20, choices=LEASE_DURATION, blank=False, null=True)

    pets = models.CharField(max_length=50, choices=PETS, blank=False,  default="No pets allowed")
    parking = models.CharField(max_length=50, choices=PARKING, blank=False,  default="Steet")
    # pets = models.ManyToManyField(Pets, blank=True)

    air_condition = models.CharField(max_length=30, null=True, default='None')
    electricity = models.CharField(max_length=20, null=True, blank=True, default='None')
    water = models.CharField(max_length=20, null=True, blank=True, default='None')
    fans = models.CharField(max_length=20, null=True, blank=True,  default='None')
    no_smoking = models.CharField(max_length=20, null=True, blank=True,  default='None')
    internet = models.CharField(max_length=20, null=True, blank=True,  default='None')
    
    
    price = models.FloatField()
    cover_image = models.ImageField(null = True, blank = True, )
    video = models.FileField(null=True, blank=True,  upload_to = 'videos/')
    description = models.TextField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now = True)

    savedStatus = models.BooleanField(default=False)
    soldStatus = models.BooleanField(default=False)
    rentedStatus = models.BooleanField(default=False)
    payingGuestStatus = models.BooleanField(default=False)
     


    def __str__(self):
        return str(self.city) + '----' + str(self.id)



    @property
    def imageURL(self):
        try:
            url = self.cover_image.url
        except:
            url = ''

        return url

    @property
    def videoURL(self):
        try:
            url = self.video.url
        except:
            url = ''

        return url



    @property
    def getUser(self):
        return self.user.name



class Property_Image(models.Model):
    Property = models.ForeignKey(Property, on_delete=models.CASCADE)
    image = models.ImageField(null=True, upload_to = 'images/')




RATING = (
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),
)




class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    Property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=50, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    rating = models.CharField(max_length=10, choices=RATING, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    is_viewed = models.BooleanField(default=False)
    deleted_from_notification = models.BooleanField(default=False)


    def __str__(self):
        return str(self.user)


@receiver(post_save, sender = Review)
def create_ReviewNotification(sender, instance, created,  **kwargs):
    if created:
       Notification.objects.create(
        user = instance.user,
        property = instance.Property,
        review  = instance,
        category = "Give Review"

       )



import json
from django.http import request


class ReviewMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    message = models.CharField(null=True, blank=True, max_length=1000)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)

    is_viewed = models.BooleanField(default=False)
    deleted_from_notification = models.BooleanField(default=False)


    def __str__(self):
        return f"message {str(self.id)}---------review--> {str(self.review.id)}"



    def save(self, *args, **kwargs):  

        channel_layer = get_channel_layer()

        data = {}
        # data['id'] = notification.id
        data['user_image'] = self.user.profile.url
        data['user'] = f"{self.user.first_name} {self.user.last_name}"

        async_to_sync(channel_layer.group_send)(

        "user_%s" % self.user.id, {
            'type': 'send_Notification_Message',
            'notification': json.dumps(data)
            }
        )


        print("mssg has beeen sent-----------------")

        super(ReviewMessage, self).save(*args, **kwargs) 



@receiver(post_save, sender = ReviewMessage)
def create_ResponseNotification(sender, instance, created,  **kwargs):
    if created:
        print(instance.review.user)

        # notification = Notification.objects.create(
        #     user = instance.user,
        #     property = instance.review.Property,
        #     review  = instance.review,
        #     category = "Responded"
        # )

        # notification.save()


        channel_layer = get_channel_layer()

        data = {}
        # data['id'] = notification.id
        data['user_image'] = instance.user.profile.url
        data['user'] = f"{instance.user.first_name} {instance.user.last_name}"
        # data['property_id'] =  instance.review.Property.id
        # data['bedroom'] = instance.review.Property.bedroom
        # data['property_type'] = instance.review.Property.property_type
        # data['property_category'] = instance.review.Property.category
        # data['city'] = instance.review.Property.city
        # data['category'] = "Responded"
        # data['property_user'] = instance.review.Property.user.email
        # data['response_user'] = instance.review.user.email

    
        created_date = instance.created_date

        print(created_date)


        data['created_date'] = created_date.strftime("%b %d, %Y")


        async_to_sync(channel_layer.group_send)(

            "user_%s" % instance.user.id, {
                'type': 'send_Notification_Message',
                'notification': json.dumps(data)
            }
        )

        print("message has been sent")




      




# @receiver(post_save, sender = ReviewMessage)
# def send_Notification(sender, instance, created,  **kwargs):

#     if created:
#         channel_layer = get_channel_layer()

#         data = {}
        # data['id'] = instance.id
        # data['user_image'] = instance.user.profile.url
        # data['user'] = f"{instance.user.first_name} {instance.user.last_name}"
        # data['property_id'] =  instance.property.id
        # data['bedroom'] = instance.property.bedroom
        # data['property_type'] = instance.property.property_type
        # data['property_category'] = instance.property.category
        # data['city'] = instance.property.city
        # data['category'] = instance.category
        # data['property_user'] = instance.property.user.email
        # data['response_user'] = instance.review.user.email

    
        # created_date = instance.created_date

        # print(created_date)


        # data['created_date'] = created_date.strftime("%b %d, %Y")


        # async_to_sync(channel_layer.group_send)(

        #     "user_%s" % instance.user.id, {
        #         'type': 'send_Notification_Message',
        #         'notification': data
        #     }
        # )

        # print("message has been sent")




@receiver(post_save, sender = ReviewMessage)
def send_message(sender, instance, created,  **kwargs):

    if created:
        print("hello message")
        channel_layer = get_channel_layer()
        data = {}
        data['message'] = instance.message

        async_to_sync(channel_layer.group_send)(
            "id_%s" % instance.review.user.id, {
                'type': 'order_message',
                'message': data
            }
        )
    


class TotalStar(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    totalStar = models.IntegerField(default=0)


    def __str__(self):
        return str(self.totalStar)



class SavedHomes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)


    def __str__(self):
        return str(self.property.id)




class SoldProperty(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.property.id)




class RentedProperty(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.property.id)



class PayingGuestProperty(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.property.id)






