


let price_box = document.querySelector('.price-display')
let pricearrow = document.querySelector('.price-arrow')
let priceDropBox = document.querySelector('.pric-dropbox')
let minHeader = document.querySelector('.min-header')
let minPriceDropdown = document.querySelector('.min-price-dropdown')

let maxHeader = document.querySelector('.max-header')
let maxPriceDropdown = document.querySelector('.max-price-dropdown')


let priceContainer = document.querySelector('.price-box')
let priceClear = document.getElementById('price-clear')
let bedClear = document.getElementById('bed-clear')
let bedContainer  = document.querySelector('.bed-box')
let bedDropBox = document.querySelector('.bed-dropbox')


let typeClear = document.getElementById('type-clear')
let typeContainer  =  document.querySelector('.type-box')
let typeBox = document.querySelector('.type-display')
let typeDropbox = document.querySelector('.type-dropbox')


let typeArrow = document.querySelector('.type-arrow')



let furnishingClear = document.getElementById('furnishing-clear')
let furnishingContainer  = document.querySelector('.furnishing-box')
let furnishingpbox = document.querySelector('.furnishing-display')
let furnishingDropbox = document.querySelector('.furnishing-dropbox')
let furnishingArrow = document.querySelector('.furnishing-arrow')




let categoryClear = document.getElementById('category-clear')
let categoryContainer  = document.querySelector('.category-box')
let categorBox = document.querySelector('.category-display')
let categoryDropbox = document.querySelector('.category-dropbox')
let categorygArrow = document.querySelector('.category-arrow')


let availabilityClear = document.getElementById('availability-clear')
let availabilityContainer  = document.querySelector('.availability-box')
let availabilityBox = document.querySelector('.availability-display')
let availabilityDropbox = document.querySelector('.availability-dropbox')
let availabilitygArrow = document.querySelector('.availability-arrow')



let bedroom = document.getElementsByName('bed');
let property_type = document.getElementsByName('type')

let furnishing = document.getElementsByName('furnishing')
let category = document.getElementsByName('category')
let rent_out_to = document.getElementsByName('rented_out_to')
let availability = document.getElementsByName('availability')

let min_price_buttons = document.querySelectorAll('[data-min-number]')
let max_price_buttons = document.querySelectorAll('[data-max-number]')


let sortValue = document.querySelectorAll('sort-value')

console.log(sortValue)

sortValue.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        console.log(hello)
    })
})


document.addEventListener('click', (e)=>{
    if(e.target.closest('.filter-box')){
        console.log("hell-----------o")
    }else{
        removeDropbox([priceDropBox, bedDropBox, typeDropbox, furnishingDropbox, categoryDropbox, availabilityDropbox])

    }
    
})




let minimum_price = ''
let maximum_price = ''
let min_price_value 
let max_price_value
let bedroom_value = ''
let property_type_value = ''
let furnishing_value = ''
let availability_value = ''
let sort_value  = ''







let urlParams  = new URLSearchParams(location.search)
address = urlParams.get('loc')



if(address == null){
    address = property_location
}

console.log(address)



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



// -----------------

price_box.addEventListener('click', () =>{
    removeDropbox([bedDropBox, typeDropbox, furnishingDropbox, categoryDropbox, availabilityDropbox])
    priceDropBox.classList.toggle('show-drop-box')

})



minHeader.addEventListener('click', () =>{
    minPriceDropdown.classList.toggle('show-min-price-dropdown')
})


maxHeader.addEventListener('click', () =>{
    maxPriceDropdown.classList.toggle('show-max-price-dropdown')
})


// -----------------------



console.log("---------", bedClear)

bedContainer.addEventListener('click', (e)=>{
    let bedDisplay  = e.target.closest('.bed-display')
    let clear = e.target.closest('#bed-clear')


    if(clear){
        bedClear.style.display = 'none'
        bedContainer.style.width = '';
        // bedContainer.style.backgroundColor = 'white'

        bedContainer.attributeStyleMap.clear()

        document.getElementById('bed-value').innerText = ``
        bedroom_value = ''

        bed_btns = ['bed1', 'bed2', 'bed3', 'bed4']

        for(var i = 0; i< bed_btns.length; i++){
            document.getElementById(bed_btns[i]).checked = false
        }




        filterFunction()
    }


    if(bedDisplay){
        removeDropbox([priceDropBox, typeDropbox, furnishingDropbox, categoryDropbox, availabilityDropbox])
        bedDropBox.classList.toggle('show-drop-box')
        // bedClear.style.display = 'flex'

    }


})



// -----------------


typeBox.addEventListener('click', () =>{
    removeDropbox([priceDropBox, bedDropBox, furnishingDropbox, categoryDropbox, availabilityDropbox])
    typeDropbox.classList.toggle('show-drop-box')
})



// -----------------------------



furnishingpbox.addEventListener('click', () =>{
    removeDropbox([priceDropBox, bedDropBox, typeDropbox, categoryDropbox, availabilityDropbox])
    furnishingDropbox.classList.toggle('show-drop-box')
})


// ------------------------------

categorBox.addEventListener('click', () =>{
    removeDropbox([priceDropBox, bedDropBox, typeDropbox, furnishingDropbox,  availabilityDropbox])
    categoryDropbox.classList.toggle('show-drop-box')
})


// ----------------------

availabilityBox.addEventListener('click', () =>{
    removeDropbox([priceDropBox, bedDropBox, typeDropbox, furnishingDropbox, categoryDropbox])
    availabilityDropbox.classList.toggle('show-drop-box')
})


// -----------------------




bedroom.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        bedroom_value = btn.value
        bedDropBox.classList.toggle('show-drop-box')
        document.getElementById('bed-value').innerText = `(${bedroom_value})`
        bedContainer.style.width = "120px";
        bedContainer.style.backgroundColor = 'rgb(202, 202, 202)'

        console.log(bedClear)
        bedClear.style.display = 'flex'
        console.log(typeArrow)
        filterFunction()

    })
})







property_type.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        property_type_value = btn.value

        typeDropbox.classList.toggle('show-drop-box')

        document.getElementById('type-value').innerText = property_type_value
        // typeContainer.style.width = "120px";
        typeContainer.style.backgroundColor = 'rgb(202, 202, 202)'
        typeArrow.style.paddingRight = '26px'
        console.log(bedClear)
        typeClear.style.display = 'flex'
        filterFunction()

    })
})

typeClear.addEventListener('click', ()=>{
    typeClear.style.display = 'none'

    typeContainer.attributeStyleMap.clear()
    document.getElementById('type-value').innerText = `Type`
    typeArrow.style.paddingRight = ''

    property_type_value = ''

    type_radio_btns = ['Apartment', 'House', 'Room', 'Flat']

    for(var i = 0; i< type_radio_btns.length; i++){
        document.getElementById(type_radio_btns[i]).checked = false
    }

    filterFunction()
})



furnishing.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        furnishing_value = btn.value
        furnishingDropbox.classList.toggle('show-drop-box')
        
        document.getElementById('furnishing-value').innerText = furnishing_value

        furnishingContainer.style.backgroundColor = 'rgb(202, 202, 202)'
        furnishingArrow.style.paddingRight = '26px'
        furnishingClear.style.display = 'flex'
        filterFunction()
    })
})


furnishingClear.addEventListener('click', ()=>{
    furnishingClear.style.display = 'none'
    furnishingContainer.attributeStyleMap.clear()

    document.getElementById('furnishing-value').innerText = `Furnishing`
    typeArrow.style.paddingRight = ''

    furnishing_value = ''

    furnishing_btns = ['Furnished', 'Semi Furnished', 'Un-Furnished']

    for(var i = 0; i< furnishing_btns.length; i++){
        document.getElementById(furnishing_btns[i]).checked = false
    }
    
    
   

    filterFunction()
})





category.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        category_value = btn.value

        if(category_value == 'Sell'){

            availabilityContainer.style.display = 'none'
            availability_value = ''

            availabilityClear.style.display = 'none'
            availabilityContainer.style.backgroundColor = 'white'
            document.getElementById('availability-value').innerText = `Availability`
            availabilitygArrow.style.paddingRight = ''
        
            availability_value = ''

        }else{
            availabilityContainer.style.display = 'flex'

        }

        categoryDropbox.classList.toggle('show-drop-box')

        document.getElementById('category-value').innerText = category_value

        categoryContainer.style.backgroundColor = 'rgb(202, 202, 202)'
        categorygArrow.style.paddingRight = '26px'
        categoryClear.style.display = 'flex'
        filterFunction()
    })
})


categoryClear.addEventListener('click', ()=>{
    categoryClear.style.display = 'none'
    categoryContainer.style.backgroundColor = 'white'
    categoryContainer.attributeStyleMap.clear()

    document.getElementById('category-value').innerText = `Category`
    availabilityContainer.style.display = 'flex'

    categorygArrow.style.paddingRight = ''

    category_value = ''

    category_radio_btns = ['Rent', 'Sell', 'PG']

    for(var i = 0; i< category_radio_btns.length; i++){
        document.getElementById(category_radio_btns[i]).checked = false
    }




    filterFunction()
})





availability.forEach((btn) =>{
    btn.addEventListener('click', ()=>{
        availability_value = btn.value
        availabilityDropbox.classList.toggle('show-drop-box')

        document.getElementById('availability-value').innerText = availability_value
        availabilityContainer.style.backgroundColor = 'rgb(202, 202, 202)'
        availabilitygArrow.style.paddingRight = '26px'
        availabilityClear.style.display = 'flex'

        filterFunction()
    })
})


availabilityClear.addEventListener('click', ()=>{
    availabilityClear.style.display = 'none'
    availabilityContainer.style.backgroundColor = 'white'
    document.getElementById('availability-value').innerText = `Availability`
    availabilitygArrow.style.paddingRight = ''

    availability_value = ''

    availability_radio_btns = ['Any', 'Family', 'Men', 'Girls']

    for(var i = 0; i< availability_radio_btns.length; i++){
        document.getElementById(availability_radio_btns[i]).checked = false
    }


    filterFunction()
})


let min_price_bool = false
let max_price_bool = false

let min_price_label = ''
let max_price_label = ''




min_price_buttons.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        minimum_price = btn.innerText
        pricearrow.style.paddingRight = '30px'
        priceClear.style.display = 'flex';
        priceContainer.style.backgroundColor = 'rgb(202, 202, 202)'
        document.getElementById('min-label').innerText = minimum_price
        
        min_price_label = btn.innerText

        if(max_price_bool == true){
            document.getElementById('price-label').innerText = `${min_price_label}-${max_price_label}`
        }else{
            document.getElementById('price-label').innerText = `${min_price_label}-`
            pricearrow.style.paddingRight = '30px'
            maxPriceDropdown.classList.toggle('show-max-price-dropdown')
        }

        min_price_bool = true

        // document.getElementById('min-label').innerText = btn.innerText
        minPriceDropdown.classList.toggle("show-min-price-dropdown")
        filterFunction()


    })
})




max_price_buttons.forEach( (btn) =>{
    btn.addEventListener('click', () =>{
        maximum_price = btn.innerText
        document.getElementById('max-label').innerText = maximum_price
        
        priceClear.style.display = 'flex';
        priceContainer.style.backgroundColor = 'rgb(202, 202, 202)'

        max_price_label = btn.innerText

        if(min_price_bool == true){
            document.getElementById('price-label').innerText = `${min_price_label}-${max_price_label}`
        }else{
            document.getElementById('price-label').innerText = `-${max_price_label}`
            pricearrow.style.paddingRight = '30px'
            minPriceDropdown.classList.toggle('show-min-price-dropdown')


        }

        max_price_bool = true

        // document.getElementById('max-label').innerText = btn.innerText
        maxPriceDropdown.classList.toggle("show-max-price-dropdown")
        filterFunction()
    })
})


priceClear.addEventListener('click', ()=>{

    priceDropBox.classList.toggle('show-drop-box')
    priceClear.style.display = 'none'

    priceContainer.attributeStyleMap.clear()

    document.getElementById('price-label').innerText = `Any Price`
    document.getElementById('min-label').innerText = `Min Budget`
    document.getElementById('max-label').innerText = `Max Budget`


    maxPriceDropdown.classList.contains("show-max-price-dropdown") &&
    maxPriceDropdown.classList.remove("show-max-price-dropdown")

    minPriceDropdown.classList.contains("show-min-price-dropdown") &&
    minPriceDropdown.classList.remove("show-min-price-dropdown")


    

    pricearrow.style.paddingRight = ''

    minimum_price = ''
    maximum_price = ''
    

    filterFunction()
})




let paginatorContainer = document.querySelector('.Page')

function filterFunction(){
    
    let url = "/filterData/"
    

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
                            'category_value': category_value,
                            'rent_out_to': availability_value,
                            'sort_value': document.getElementById('sort-value').value
                        })  
    })
    .then((response) =>{
        return response.json()
    })
    .then((data) =>{
        
        console.log('sucess')
        // console.log(data.rooms)
        var rooms = JSON.parse(data.rooms)

        console.log(rooms)

        var has_previous = data.has_previous
        var has_next = data.has_next
        var pagenumber = data.pagenumber


        console.log(pagenumber)

    

        if(rooms.length == 0){
            document.querySelector('.room-header').style = "display: none"
            document.querySelector('.room-body').style = "display: none"

            document.querySelector('.error-body').style = "display: block"
        }else{
            document.getElementById('room-count').innerHTML = rooms.length
            displayProperty(rooms)
            // displayPaginator(has_previous, has_next, pagenumber)

        }
    })
}



// function displayPaginator(has_previous, has_next, pagenumber){
//     paginatorContainer.innerHTML = ''

//     console.log("aaaaaa",  rooms)

//     paginatorContainer.innerHTML = ` <ul class="pagination">
                                        
//                                         ${(has_previous == true ?
//                                             ` <li class="page-item">
//                                                     <a class="page-link" href="" aria-label="Previous">
//                                                     <span aria-hidden="true">&laquo;</span>
//                                                     </a>
//                                                 </li>
//                                                 `:'')}
                                       
                                        
//                                         ${Array.from(Array(parseInt(pagenumber)).keys()).map(i => (
//                                             `<li class="page-item"><a class="page-link" href="">${i+1}</a></li>`
//                                         )).join('')
//                                         }

                                        
//                                         ${(has_next == true ? 
//                                             `<li class="page-item">
//                                                 <a class="page-link" href="${filterFunction()}" aria-label="Next">
//                                                 <span aria-hidden="true">&raquo;</span>
//                                                 </a>
//                                             </li>`: ''
                                            
//                                         )}
//                                     </ul>`

// }


// ${(rooms[i].fields.soldStatus == false) ? `<p id="rent" >For Rent</p>`:` <p id="sold" >Sold</p>` }
function displayProperty(rooms){

    document.querySelector('.room-header').style = "display: flex"
    document.querySelector('.room-body').style = "display: flex"

    document.querySelector('.error-body').style = "display: none"
    var room_container = document.querySelector('.room-body')
    room_container.innerHTML = ''

    console.log("rooms", rooms)

    for(var i = 0; i< rooms.length; i++){

        room_container.innerHTML += `
                                        <div class="room">
                                                <div class="image">
                                                    <a href="/room_detail/${rooms[i].pk}">
                                                        <img src="${rooms[i].fields.cover_image}" alt="">
                                                        <div class="overlay"></div>
                                                    </a>

                                                    <div class="image-top">
                                                        <p id="${rented_or_sale_get_className(rooms[i])}" >${rented_or_sale_get_tag(rooms[i])}</p>

                                                        <div class="fav-box">
                                                            <i class="fa-solid fa-heart ${(rooms[i].fields.saved_status == true) ? `saved-room-icon `:``}" onclick="savedHomesFunction(${rooms[i].pk}, this)" ></i>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <a href="/room_detail/${rooms[i].pk}">
                                                    <div class="price-date">
                                                        <h3>${rooms[i].fields.price}</h3>
                                                        <p>${rooms[i].fields.date}</p>
                                                    </div>

                                                    

                                                    <div class="room-info">
                                                        <div class="bed ">
                                                            <i class="fa-solid fa-bed"></i>
                                                            <p>${rooms[i].fields.bedroom} bd</p>
                                                        </div>
                                                        <div class="bat">
                                                            <i class="fa-solid fa-bath"></i>
                                                            <p>${rooms[i].fields.bathroom} ba</p>
                                                        </div>
                                                        <div class="area ">
                                                            <i class="fa-solid fa-chart-area"></i>
                                                            <p>${rooms[i].fields.area} sq.ft</p>
                                                        </div>
                                                    </div>

                                                    <div class="room-title">
                                                        <p>${rooms[i].fields.bedroom} BHK ${rooms[i].fields.property_type} on ${rooms[i].fields.category}</p>
                                                    </div>

                                                    <div class="address">
                                                        <p>${rooms[i].fields.city}</p>
                                                    </div>
                                                </a>

                                                <div id="bottomline"></div>
                                        </div>
                                    `

    }

}



function rented_or_sale_get_className(rooms){
    console.log(rooms)

    if(rooms.fields.soldStatus == true || rooms.fields.rentedStatus == true){

        if(rooms.fields.soldStatus == true){
            return "sold"   
        }

        else if( rooms.fields.rentedStatus == true){
            return 'rented'
        }
        else if(rooms.fields.payingGuestStatus == true){
            return 'rented'
        }

    }

    else{
        category = rooms.fields.category

        console.log("category ----------------------")

        if(category == 'Rent'){
            return 'rent'

        }else if(category == 'Sell'){
            return 'sell'
        }
        else if(category == 'PG'){
            return 'sell'

        }
    }
    
}



function rented_or_sale_get_tag(rooms){
    
    if(rooms.fields.soldStatus == true || rooms.fields.rentedStatus == true || rooms.fields.payingGuestStatus == true){

        if(rooms.fields.soldStatus == true){
            return "Sold"   
        }

        else if( rooms.fields.rentedStatus == true){
            return 'Rented'
        }

        else if(rooms.fields.payingGuestStatus == true){
            return 'PG'
        }

    }

    else{
        category = rooms.fields.category

        if(category == 'Rent'){
            return 'For Rent'
            
        }else if(category == 'Sell'){
            return 'For Sell'
        } else if(category == 'PG'){
            return 'PG'
        }
    }

}






function formatDate(date){

    year = 0
    month  = 0
    hour = 0
    second = 0

    date = new Date(date)
    year_value = date.getFullYear()
    month_value = date.getMonth()
    hour_value = date.getHours()
    date_value = date.getDate()
    second_value = date.getSeconds()


  

   

    time = `${year_value}/${month_value}/${hour_value}/${second_value}`
    console.log(time)
    return time

}






function removeDropbox(dropbox){

    

    for(var i = 0; i<dropbox.length; i++){

        dropbox[i].classList.contains('show-drop-box') &&
        dropbox[i].classList.remove("show-drop-box")
        // if(dropbox[i].classList.contains('form-step-active')){
        //     dropbox[i].classList.remove("form-step-active")
        // }

         
    }

}







function savedHomesFunction(id, icon){

    if(user == 'AnonymousUser'){
        window.location.href = '/login'
    }else{
        
        icon.classList.toggle('saved-room-icon')
        
        data = new FormData()
        data.append('id', id)
        
        var url = '/saved_Homes/'


        fetch(url, {

            method: 'POST',
            headers : {
                'Content-Type': 'application/json',        
                'X-CSRFToken': csrftoken},

            body: JSON.stringify({'id': id})
        })

        .then((response) =>{
            return response.json()
        })

        .then((data) =>{
            console.log(data)

        })

    }
}