let budget_arrow = document.getElementById('budget_arrow')
let bedroom_arrow = document.getElementById('bedroom_arrow')
let property_arrow = document.getElementById('property_arrow')
let furnishing_arrow = document.getElementById('furnishing_arrow')
let rent_out_arrow = document.getElementById('rent_out_to_arrow')
let age_arrow = document.getElementById('age_arrow')

let budget_body = document.querySelector('.budget-body')
let bedroom_body = document.querySelector('.bedroom-body')
let property_type_body = document.querySelector('.property-type-body')
let furnishing_body = document.querySelector('.furnishing-body')
let rented_out_to_body = document.querySelector('.rented_out_to_body')
let age_body = document.querySelector('.age_body')


let min_price = document.getElementById('min-price');
let max_price = document.getElementById('max-price');


let bedroom = document.getElementsByName('bed');
let property_type = document.getElementsByName('type')
let furnishing = document.getElementsByName('furnishing')
let rent_out_to = document.getElementsByName('rented_out_to')
let age = document.getElementsByName('age')

let bedroom_label  = document.querySelectorAll('#bed_label')
let property_type_label  = document.querySelectorAll('#property_type_label')
let furnishing_label  = document.querySelectorAll('#furnishing_label')
let rented_out_to_label  = document.querySelectorAll('#rented_out_to_label')
let age_label  = document.querySelectorAll('#age_label')
let clear_all = document.getElementById('clear-all')

let applied_filters = document.querySelector('.applied-filters')
let applied_body = document.querySelector('.applied-body')
let applied_body_children =  document.querySelector('.applied-body').children


let drop_down_header = document.querySelector('.sort-header')
let drop_down_box = document.querySelector('.sort-dropdown')
let drop_icon_arrow = document.querySelector('.down')
let drop_icon   = false

let sortValue = document.querySelectorAll('.dropdown-list')

let min_price_dropdown = document.querySelector('.min-price-dropdown')
let max_price_dropdown = document.querySelector('.max-price-dropdown')

let min_price_buttons = document.querySelectorAll('[data-min-number]')
let max_price_buttons = document.querySelectorAll('[data-max-number]')



let filter_value = []
let filter_status  = true

let minimum_price = ''
let maximum_price = ''
let min_price_value 
let max_price_value
let bedroom_value = ''
let property_type_value = ''
let furnishing_value = ''
let rent_out_to_value = ''
let age_value = ''
let sort_value  = ''

console.log("hello")


let urlParams  = new URLSearchParams(location.search)
let address = urlParams.get('loc')

function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getToken('csrftoken');


document.addEventListener('DOMContentLoaded', () =>{
    min_price_dropdown.classList.toggle("hide_min_price_dropdown")
    max_price_dropdown.classList.toggle("hide_max_price_dropdown")
})


document.querySelector('.min-price-body').addEventListener('click', () =>{
    min_price_dropdown.classList.toggle('hide_min_price_dropdown')
  
})

document.querySelector('.max-price-body').addEventListener('click', () =>{
    max_price_dropdown.classList.toggle('hide_max_price_dropdown')
  
})


min_price_buttons.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        minimum_price = btn.innerText
        document.getElementById('min-label').innerText = btn.innerText
        min_price_dropdown.classList.toggle("hide_min_price_dropdown")
        filterFunction()
    })
})

max_price_buttons.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        maximum_price = btn.innerText
        document.getElementById('max-label').innerText = btn.innerText
        // max_price_dropdown.classList.toggle("hide_max_price_dropdown")
        filterFunction()
    })
})



min_price_dropdown.addEventListener('click', () =>{
    min_price_dropdown.classList.toggle('hide_min_price_dropdown')
})


budget_arrow.addEventListener('click', () =>{
    budget_body.classList.toggle("hide_budget")
    console.log('working')
})


bedroom_arrow.addEventListener('click', () =>{
    bedroom_body.classList.toggle('bedroom_hide')
})

property_arrow.addEventListener('click', () =>{
    property_type_body.classList.toggle('property_type_hide')
})

furnishing_arrow.addEventListener('click', () =>{
    furnishing_body.classList.toggle('furnishing_hide')
})

rent_out_arrow.addEventListener('click', () =>{
    rented_out_to_body.classList.toggle('rented_out_to_hide')
})

age_arrow.addEventListener('click', () =>{
    age_body.classList.toggle('age_hide')
})




bedroom.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        bedroom_value = btn.value
        filterFunction()
    })
})


property_type.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        property_type_value = btn.value
        filterFunction()
    })
})

furnishing.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        furnishing_value = btn.value
        filterFunction()
    })
})

rent_out_to.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        rent_out_to_value = btn.value
        filterFunction()
    })
})

age.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        age_value = btn.value
        filterFunction()
    })
})





bedroom_label.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        filter_value.push(btn.innerText)
        displayFilterStatus()
    })
})

property_type_label.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        filter_value.push(btn.innerText)
        displayFilterStatus()
    })
})


furnishing_label.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        filter_value.push(btn.innerText)
        displayFilterStatus()
    })
})

rented_out_to_label.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        filter_value.push(btn.innerText)
        displayFilterStatus()
    })
})

age_label.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        filter_value.push(btn.innerText)
        displayFilterStatus()
    })
})


clear_all.addEventListener('click', () =>{
    filter_value = []
    console.log(filter_value)
    displayFilterStatus()  

})


filter_value.forEach((btn) =>{
    console.log(btn)
    btn.addEventListener('click', () =>{
        console.log("hello")
    })
})


sortValue.forEach((btn) => {
    btn.addEventListener('click', () =>{
        sort_value = btn.dataset.value
        document.getElementById('sort_title').innerText = `${sort_value.substr(0, 6)}..`
        drop_down_box.classList.toggle('hide-dropdown');
        drop_icon_arrow.classList.remove('fa-angle-up')
        drop_icon_arrow.classList.add('fa-angle-down')
        drop_icon = false
        filterFunction()
    })
})



function displayFilterStatus(){

    if(filter_value != ''){

        console.log(filter_value)
        applied_filters.style = "display: block"
        
        applied_body.innerHTML = ''
        filter_value.forEach((value, index) =>{
            console.log("index", index)
            applied_body.innerHTML += `<div class="filter-body" onclick="removefilterDiv(${index})">
                                            <p>${value}</p>
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>`
            // applied_body.innerHTML += value
        })

        // console.log(applied_body_children)


    }else{
        applied_filters.style = "display: none"
        window.location.reload()
        // console.log("not hello")
    }
}



function removefilterDiv(index){
   
    filter_value.splice(index, 1)
    filter_value = filter_value
    console.log( " after removed",filter_value)
    displayFilterStatus()
}



function filterFunction(){
    
    url = "/filterData/"
    
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },

        body: JSON.stringify({
                            'location': address,
                            'minimum_price': minimum_price,
                            'maximum_price': maximum_price,
                            'bedroom': bedroom_value,
                            'property_type': property_type_value,
                            'furnishing_value': furnishing_value,
                            'rent_out_to': rent_out_to_value,
                            'age_value': age_value,
                            'sort_value': sort_value
                        })  
    })
    .then((response) =>{
        return response.json()
    })

    .then((data) =>{

        var rooms = JSON.parse(data)

        console.log('daata')
        console.log(rooms)

        room_container = document.querySelector('.room-container')
        room_container.innerHTML = "";
        for(var i = 0; i< rooms.length; i++){
            room_container.innerHTML += ` <div class="room-sec">
                                                    <div class="row">
                                                            <div class="col-md-3 bg-secondary">
                                                                <a href="">
                                                                    <div class="image">
                                                                        <img src="${rooms[i].fields.cover_image}" alt="">
                                                                    </div>
                                                                </a>
                                                            </div>

                                                            <div class="col-md-8 ">
                                                                <a href="/room_detail/${rooms[i].pk}" style="color: black;">
                                                                    <div class="room-detail">
                                                                        <p class="header">${rooms[i].fields.description}</p>
                                                                        <h2>${rooms[i].fields.property_type}</h2>
                                                                        <hr>
                                                                        <div class="price-area-room">
                                                                            <div class="price">
                                                                                <span><h2><i class="fa-solid fa-indian-rupee-sign"></i></h2><h2>${rooms[i].fields.price}</h2>/month</span>
                                                                                <p>${rooms[i].fields.security_deposite}</p>
                                                                            </div>

                                                                            <div class="area">
                                                                                <h2>1,561 <span>sqft</span></h2>
                                                                                <p>(145 sq m) carpet area</p>
                                                                            </div>
                                                                            <div class="room">
                                                                                <h2>${rooms[i].fields.bedroom} BHK</h2>
                                                                                <p>${rooms[i].fields.bathroom} Baths</p>
                                                                            </div>
                                                                        </div>

                                                                        <div class="description-section">
                                                                            <p>${rooms[i].fields.description}</p>
                                                                        </div>

                                                                        <div class="rented-out-to">
                                                                            <p>${rooms[i].fields.rent_out_to}</p>
                                                                            <!-- <p>FOR FAMILY</p> -->
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <hr class="hr">

                                                            <div class="row">
                                                                <div class="col">
                                                                    <div class="profile-contact">
                                                                        <div class="date-profile">
                                                                            <p>${rooms[i].fields.updated_date}</p>
                                                                            <h2>${rooms[i].fields.user}</h2>
                                                                        </div>

                                                                        <a href="">
                                                                            <div class="contact-number">
                                                                                <p>View Phone Number</p>
                                                                            </div>
                                                                        </a>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                    </div>
                                                    
                                                </div>`
        }





    })
}



drop_down_header.addEventListener('click', ()  =>{
    if (drop_icon == false){
        drop_down_box.classList.toggle('hide-dropdown');
        drop_icon_arrow.classList.remove('fa-angle-down')
        drop_icon_arrow.classList.add('fa-angle-up')
        drop_icon = true

    }else{
        drop_down_box.classList.toggle('hide-dropdown');
        drop_icon_arrow.classList.remove('fa-angle-up')
        drop_icon_arrow.classList.add('fa-angle-down')
        drop_icon = false
    }
})
