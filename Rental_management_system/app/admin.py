from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Review)
admin.site.register(SavedHomes)
admin.site.register(SoldProperty)
admin.site.register(TotalStar)
admin.site.register(Province)
admin.site.register(City)
admin.site.register(ReviewMessage)
admin.site.register(RentedProperty)




class PostImageAdmin(admin.StackedInline):
    model  = Property_Image


@admin.register(Property)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageAdmin]

    class Meta:
        model = Property


@admin.register(Property_Image)
class PostImageAdmin(admin.ModelAdmin):
    pass
