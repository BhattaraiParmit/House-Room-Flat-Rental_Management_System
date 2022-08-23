from unicodedata import category
from django import template

register = template.Library()




def get_saved_or_not(value, user):


    label = ''

    try:
        
        if value.savedhomes_set.filter(property = value, user = user):
            label = 'saved-room-icon'

        else:
            label = ''

    except:

        label = ''



    return label

register.filter('savedOrNot', get_saved_or_not)





def rented_or_sale_get_className(value):

    rented_status = value.rentedStatus
    sold_status = value.soldStatus
    paying_Guest_Status = value.payingGuestStatus

    label = ''

    if rented_status == True or sold_status == True:

        if  rented_status == True:

            label = 'rented'

        elif sold_status == True:

            label = 'sold'

        elif paying_Guest_Status == True:
            label = "Booked"

    else:
        category = value.category

        if category == "Rent":
            label = 'rent'

        elif category == 'Sell':
            label = 'sell'

        elif category == 'PG':
            label = 'rent'




    return label



register.filter('rented_or_sale_get_className', rented_or_sale_get_className)




def rented_or_sale_get_tag(value):
    rented_status = value.rentedStatus
    sold_status = value.soldStatus
    paying_Guest_Status = value.payingGuestStatus

    label = ''

    if rented_status == True or sold_status == True:

        if  rented_status == True:

            label = 'Rented'

        elif sold_status == True:

            label = 'Sold'

        elif paying_Guest_Status == True:
            label = "Rented"

    else:
        category = value.category

        if category == "Rent":
            label = 'For Rent'

        elif category == 'Sell':
            label = 'For Sell'

        elif category == 'PG':
            label = 'PG'

    return label

register.filter('rented_or_sale_get_tag', rented_or_sale_get_tag)




def getActivatedStatus(value):
    rented_status = value.rentedStatus
    sold_status = value.soldStatus
    paying_Guest_Status = value.payingGuestStatus


    label = ''

    if rented_status == True or sold_status == True or paying_Guest_Status == True:

        if  rented_status == True:

            label = 'Rented'

        elif sold_status == True:

            label = 'Sold'

        elif paying_Guest_Status == True:

            label = 'Booked'

    else:
        label = 'Active'
       
    return label
    

register.filter('getActivatedStatus', getActivatedStatus)





def getActivatedStatusClassName(value):
    rented_status = value.rentedStatus
    sold_status = value.soldStatus
    paying_Guest_Status = value.payingGuestStatus

    label = ''

    if rented_status == True or sold_status == True or paying_Guest_Status == True:

        if  rented_status == True:

            label = 'sold'

        elif sold_status == True:

            label = 'sold'

        elif paying_Guest_Status == True:

            label = 'sold'

    else:
        label = 'rent'


    return label
    

register.filter('getActivatedStatusClassName', getActivatedStatusClassName)




def getToggleStatus(value):

    rented_status = value.rentedStatus
    sold_status = value.soldStatus
    paying_Guest_Status = value.payingGuestStatus

    label = ''

    if rented_status == True or sold_status == True or paying_Guest_Status == True:

        if  rented_status == True:

            label = 'active'

        elif sold_status == True:

            label = 'active'

        elif paying_Guest_Status == True:

            label = 'active'

    else:
        label = ''


    return label

register.filter('getToggleStatus', getToggleStatus)




def getDate(value):

    pass

register.filter('getDate', getDate)













i = 0

@register.filter(name='times') 

def times(number):
    b = i + 1
    print("b", b)
    return range(number)
