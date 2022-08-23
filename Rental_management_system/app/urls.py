from unicodedata import name
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.Home_Page, name="home"),
    path('room/', views.room_page, name="room"),
    path('room_detail/<str:pk>/', views.room_detail, name="room_detail"),

    path('post_property/', views.PostProperty, name="post_property"),
    path('property-list/', views.properties, name="property-list"),
    path('editProperty/<int:pk>/', views.editProperty, name="editProperty" ),
    path('deleteProperty/<int:pk>/', views.deleteProperty, name="deleteProperty" ),

    path('deleteSavedHomes/<str:pk>/', views.deleteSavedHomes, name='deleteSavedHomes'),

    path('postData/', views.postData, name = "postData"),
    path('newPostData/', views.newPostData, name = "newPostData"),
    path('saveEditedProperty/', views.saveEditedProperty, name = "saveEditedProperty"),

    
    
    path('filterData/', views.filterData, name="filterData"),

    path('login/', views.loginPage, name="login"),

    path('register/', views.registerPage, name="register"),

    path('verify/<str:auth_token>/', views.verify, name="verify"),
    
    path('logout/', views.logoutPage, name="logout"),

    path('changePassword/', views.changePassword, name="changePassword"),

    path('profilePage/<int:pk>/', views.profilePage, name='profilePage'),

    path('postReview/', views.postReview, name="postReview"),

    path('searchomes/', views.searchHomes, name="searchomes"),

    path('deleteReview/', views.deleteReview, name="deleteReview"),

    path('getReviewReply/', views.getReviewReply, name="getReviewReply"),

    # path('notification/', views.ReviewNotification, name = "notification"),

    # ================================================================================================

    path('getHomes/<str:location>', views.getHomes, name="getHome"),
    path('saved_Homes/', views.savedHomes, name = "saved_Home"),
    path('saved_home_list/', views.savedHomesSection, name = "savedHomesSection"),

    path('get_selected_homes/<str:category>/', views.getBuyandSaleHomes, name = "get_selected_homes"),



    path('getNewHomes/', views.getNewHomes, name="getNewHomes"),

    path('getPropertyByType/<str:type>/', views.getPropertyByType, name="getPropertyByType"),

    path('getPrpertyByCategory/', views.getPropertyByCategory, name="getPrpertyByCategory"),

    path('getSavedPrpertyByCategory/', views.getSavedPrpertyByCategory, name="getSavedPrpertyByCategory"),

    path('getSearchListing/', views.getSearchListing, name="getSearchListing"),

    path('getSavedPropertySearch/', views.getSavedPropertySearch, name="getSavedPropertySearch"),


    path('sendEmail/', views.sendEmail, name = "sendEmail"),

    path('passwordChnageSection', views.passwordChange, name="passwordChnageSection"),

    path('getSOldHomes/', views.getSoldHomes, name="getSoldHomes"),

    path('soldProperty/', views.soldProperty, name="soldProperty"),


    path('getCityFromProvinceName/', views.getCityFromProvinceName, name="getCityFromProvinceName"),

    path('getEditPropertyCityName/', views.getEditPropertyCityName, name="getEditPropertyCityName"),


    path('submitReviewMessage/', views.submitReviewMessage, name="submitReviewMessage"),


    path('getGeneralProperty/', views.getGeneralProperty, name="getGeneralProperty"),


    # =========================================================================

    path('reset_password/',
    auth_views.PasswordResetView.as_view(template_name = "app/resetPassword.html"),
    name='password_reset'),

    path('reset_password_sent/',
    auth_views.PasswordResetDoneView.as_view(template_name = "app/passwordResetDone.html"),
    name='password_reset_done'),

    path('reset/<uidb64>/<token>/', 
    auth_views.PasswordResetConfirmView.as_view(template_name = "app/passwordResetConfirm.html"), 
    name='password_reset_confirm'),

    path('reset_password_complete/', 
    auth_views.PasswordResetCompleteView.as_view(template_name = "app/passwordResetComplete.html"), 
    name='password_reset_complete'),


]