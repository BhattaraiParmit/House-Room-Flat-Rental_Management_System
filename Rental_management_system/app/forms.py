from tkinter import Widget
from django import forms
from django.forms import ModelForm, PasswordInput
from .models import Property, Property_Image
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from .models import *
from django import forms
from django.contrib.auth import password_validation
from django.utils.translation import gettext_lazy as _





class propertyForm(forms.ModelForm):

    lease_duration = forms.ChoiceField(choices= LEASE_DURATION, widget=forms.RadioSelect)

    class Meta:
        model = Property
        fields = "__all__"

        
        widgets = {
            'address': forms.TextInput(attrs={'placeholder': 'address'})
        }
        



class RegistrationForm(UserCreationForm):


    password1 = forms.CharField(max_length=16, widget=forms.PasswordInput(attrs={'placeholder': 'PASSWORD'}))
    password2 = forms.CharField(max_length=16, widget=forms.PasswordInput(attrs={'placeholder': 'CONFIRM PASSWORD'}))

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'phone', 'email', 'password1', 'password2']

        widgets = {
            'first_name': forms.TextInput(attrs={'placeholder': 'FIRST NAME'}),
            'last_name': forms.TextInput(attrs={'placeholder': 'LAST NAME'}),
            'username': forms.TextInput(attrs={'placeholder': 'USERNAME'}),
            'phone': forms.TextInput(attrs={'placeholder': 'PHONE'}),
            'email': forms.TextInput(attrs={'placeholder': 'EMAIL'}),
        }

    
    # def save(self, commit = True):
    #     user = super(RegistrationForm, self).save(commit=False)
    #     first_name = self.cleaned_data['first_name']
    #     last_name = self.cleaned_data['last_name']

    #     user.username = "@{}_{}".format(first_name, last_name)
    #     user.name = "{} {}".format(first_name, last_name)

    #     if commit:
    #         user.save()

    #     return user




class profileUpdateForm(forms.ModelForm):
    
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'phone', 'profile']

        widgets = {
            'email': forms.TextInput(attrs={'class': 'form-control', 'readonly':'readonly'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'readonly':'readonly'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'readonly':'readonly'}),
            'phone': forms.TextInput(attrs={'class': 'form-control'}),
            # 'profile': forms.TextInput(attrs={'class': 'form-control'}),
        }



class MyPasswordChangeForm(PasswordChangeForm):

    old_password = forms.CharField(
        label=_("Old password"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'current-password', 'autofocus': True, 'class': 'form-control', 'placeholder': 'OLD PASSWORD' }),
    )

    new_password1 = forms.CharField(
        label=_("New password"),
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password', 'class': 'form-control', 'placeholder': 'NEW PASSWORD' }),
        strip=False,
        help_text=password_validation.password_validators_help_text_html(),
    )
    new_password2 = forms.CharField(
        label=_("New password confirmation"),
        strip=False,
        widget=forms.PasswordInput(attrs={'autocomplete': 'new-password', 'class': 'form-control', 'placeholder': 'CONFIRM PASSWORD'  }),
    )