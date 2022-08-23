const form = document.getElementById('form')
const prevBtns = document.querySelectorAll('.prev-btn');
const nextBtns = document.querySelectorAll('.btn-next');
const progressLine = document.getElementById('progress')
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step')
const progress = document.querySelector('.progress-line');

let category = document.getElementsByName('category');
let property_type = document.getElementsByName('type');
let address = document.getElementById('location');
let bedrooms = document.getElementsByName('bedrooms');
let bathrooms =  document.getElementsByName('bathrooms');
let balconies =  document.getElementsByName('balconies');

let furnishing =  document.getElementsByName('furnishing');
let property_age =  document.getElementsByName('age');
let rent_out_to =  document.getElementsByName('rent_out_to');

let price = document.getElementById('price');
let security = document.getElementsByName('security');
let negotiable = document.getElementsByName('negotiable');
let description = document.getElementById('description');

let picture_section = document.querySelector('.image-container')
let card = document.querySelector('.card')
let small_card = document.querySelector('.small-card-container')
let card_input = document.querySelector('.card-file')
let small_input = document.querySelector('.small-file')
let card_upload_btn = document.getElementById('card-upload-btn')
let small_upload_btn = document.getElementById('small-upload-btn')
let files = []
// let room_image = []
let cover_photo = []


picture_section.addEventListener('click', function(e){
    const deleteEl = e.target.closest('.fa-trash')
    const imageEl = e.target.closest('img');
    const coverEl = e.target.closest('.make-cover-photo');
    
    if(deleteEl){}
    if(imageEl){}

    if(coverEl){

        console.log('clicked')

        cover_photo = []


        var cover_btn = document.querySelectorAll('.make-cover-photo')

        for(var i = 0; i < cover_btn.length; i++){
            if(cover_btn[i].classList.contains("cover-photo-btn")){
                cover_btn[i].classList.remove("cover-photo-btn")
                
            }   
        }

        coverEl.classList.add("cover-photo-btn")
        coverEl.innerText = "cover Photo"

        for(var i = 0; i < cover_btn.length; i++){
            if(cover_btn[i].classList.contains("cover-photo-btn")){
                cover_photo.push(files[i])
            }   
        }

    }
})



card_upload_btn.addEventListener('click', () =>{
    card_input.click()

})

small_upload_btn.addEventListener('click', () =>{
    small_input.click()

})


console.log("0hoooooo")
console.log("hel000")



card_input.addEventListener('change', (e) =>{
    console.log("e", e.target.files)
    let file  = card_input.files;
    let img = e.target.files


    if(files.length == 0){
        small_card.style = "display: block;"
    }

    for(var i = 0; i < file.length; i++){
        // console.log("imahge", file[i])
        files.push(file[i])
        // console.log(file[i])

        
        display_image(file[i])
    }

    cover_photo.push(files[0])   

    var cover_btn = document.querySelectorAll('.make-cover-photo')
    cover_btn[0].classList.add("cover-photo-btn")
    cover_btn[0].innerText = "cover Photo"


    
    // console.log(cover_photo)
    card.style = "display: none;"
    small_card.style = "display: block;"

    // submitData()
    // showImage()
    // console.log(cover_photo_btn_container)
})




small_input.addEventListener('change', () =>{
    let file  = small_input.files;


    for(var i = 0; i < file.length; i++){
        files.push(file[i])
        display_image(file[i])
    }


    card.style = "display: none;"
    small_card.style = "display: block;"
    // showImage()
    // console.log(cover_photo_btn_container)

})



function display_image(e){
    let image = ''

    
    image = `<div class="image">
                   <img src="${URL.createObjectURL(e)}" alt="">
                     <i class="fa-solid fa-trash"></i>
                    <div class="cover-zoom">
                         <p class = "make-cover-photo" >Make Cover photo</p>
                         <i class="fa-solid fa-magnifying-glass"></i>
                     </div>
            </div>`

    picture_section.innerHTML += image

            
}   



// function showImage(){
//     // let image  = ''
//     // picture_section.innerHTML = ''

//     files.forEach((e,i) =>{
//         var image_div  = document.createElement('div')
//         image_div.classList.add('image');

//         var image_src = document.createElement('img')
//         image_src.setAttribute('src', `${URL.createObjectURL(e)}`)

//         var trash_icon = document.createElement('i');
//         trash_icon.classList.add('fa-solid')
//         trash_icon.classList.add('fa-trash')

//         var cover_zoom_div = document.createElement('div')
//         cover_zoom_div.classList.add('cover-zoom')

//         var cover_photo_btn = document.createElement('p')
//         cover_photo_btn.classList.add('cover-photo-btn')
//         cover_photo_btn.innerText = 'cover photo'

//         var magnificant_zoom = document.createElement('i');
//         // magnificant_zoom.classList.add('fa-solid fa-magnifying-glass')
//         magnificant_zoom.classList.add('fa-solid')
//         magnificant_zoom.classList.add('fa-magnifying-glass')

//         cover_zoom_div.appendChild(cover_photo_btn)
//         cover_zoom_div.appendChild(magnificant_zoom)

//         image_div.appendChild(image_src)
//         image_div.appendChild(trash_icon)
//         image_div.appendChild(cover_zoom_div)



//         picture_section.appendChild(image_div)
//         // image += image_div
      
//         // image += `<div class="image">
//         //             <img src="${URL.createObjectURL(e)}" alt="">
//         //             <i class="fa-solid fa-trash"></i>
//         //             <div class="cover-zoom">
//         //                 <p class = "cover-photo-btn" >Cover photo</p>
//         //                 <i class="fa-solid fa-magnifying-glass"></i>
//         //             </div>
//         //         </div>`

        
//     })  

//     // picture_section.innerHTML += image

//     cover_photo_btn_container = []
//     cover_photo_btn_container.push(document.querySelectorAll('.cover-photo-btn'))


// }


// const showImage = () =>{

  
    
// }








let category_value = getRadioValue(category)
let property_type_value = getRadioValue(property_type)
let bedroom_value 
let bathroom_value 
let balconies_value 
let furnishing_value 
let property_age_value 
let rent_out_to_value 
let price_value
let security_deposite_value
let description_value
let negotiable_value


let formStepNum = 0;
let progress_height = 0;


function getCookie(name) {
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
const csrftoken = getCookie('csrftoken');



nextBtns.forEach((btn) =>{
    btn.addEventListener('click', () =>{
        if(btn.classList.contains('location')){
            checkFormValidation("location")
        }
        else if(btn.classList.contains('room-detail')){
            checkFormValidation('room-detail')
        }
        else if(btn.classList.contains('photos')){
            checkFormValidation('photos')
        } 
        else{
            formStepNum++
            // console.log(formStepNum)
            updateFormStep()
            updateProgressBar()
        }
        
    })
})



prevBtns.forEach((btn) => {

    btn.addEventListener('click', () =>{
        formStepNum--
        updateFormStep()
        
    })
})



$("#location").keydown(function(e){
    if(e.keyCode == 13){
        e.preventDefault()
    }
})


$("#price").keydown(function(e){
    if(e.keyCode == 13){
        e.preventDefault()
    }
})



function checkFormValidation(btn_classList){
   
  if(btn_classList == "location"){

    if(address.value == ''){
        address.style = "border: 1px solid red"
    }else{
        formStepNum =2
        updateFormStep();
        updateProgressBar()
    }
    
  }

  if(btn_classList == 'room-detail'){
   
    bedroom_value = getRadioValue(bedrooms);
    bathroom_value = getRadioValue(bathrooms);
    balconies_value = getRadioValue(balconies)
    furnishing_value = getRadioValue(furnishing)
    property_age_value = getRadioValue(property_age)
    rent_out_to_value = getRadioValue(rent_out_to)
   

    if(bedroom_value == undefined || balconies_value == undefined || balconies_value == undefined || furnishing_value == undefined || property_age_value == undefined || rent_out_to_value == undefined  ){

            // console.log("empty")


            if(bedroom_value == undefined || balconies_value == undefined || balconies_value == undefined ){
                document.querySelector('.room-detail-explainations').style = "display: block"
                document.querySelector('.room-detail-error-message').style = "display: block"
            }

            if(furnishing_value == undefined){
                document.querySelector('.furnishing-error-explainations').style = "display: block"
                document.querySelector('.furnishing-error-message').style = "display: block"
            }
        
            if(property_age_value == undefined){
                document.querySelector('.age-error-explainations').style = "display: block"
                document.querySelector('.age-error-message').style = "display: block"
            }
        
            if(rent_out_to_value == undefined){
                document.querySelector('.rent_out_to_explainations').style = "display: block"
                document.querySelector('.rent_out_to_error-message').style = "display: block"
            }


        }
        else{

            formStepNum = 3
            updateFormStep()
            updateProgressBar()
            
      }

  } 


  if(btn_classList == 'photos'){
    formStepNum = 4
    updateFormStep()
    updateProgressBar()
  }

}




function updateFormStep(){
    formSteps.forEach((formStep) => {
        formStep.classList.contains('form-step-active') &&
        formStep.classList.remove("form-step-active")
    })
    formSteps[formStepNum].classList.add("form-step-active");
}




function updateProgressBar(){
    progressSteps.forEach((progressStep, idx) =>{
        if(idx < formStepNum + 1){
            progressStep.classList.add("progress-step-active");

        }else{
            progressStep.classList.remove("progress-step-active")
        }
    })

    const progressActive = document.querySelectorAll('.progress-step-active');

    progress_height += 77.5
    progress.style = `height: ${progress_height}px !important`
    

}




function getRadioValue(radio_btns){
    let radio_value;

    for(var i = 0; i < radio_btns.length; i++){
        if(radio_btns[i].checked){
          radio_value = radio_btns[i].value
        }
    }

    return radio_value

}



form.addEventListener('submit', (e) =>{
    e.preventDefault()


    data  = new FormData()

    if(cover_photo.length != 0){
        data.append("cover_images", cover_photo[0])

        for (var pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

    }


    if(files.length != 0){
        for(i = 0; i < files.length; i++){
            console.log("files", files[i])
            data.append('images', files[i])
        }
    }



    security_deposite_value = getRadioValue(security)
    negotiable_value = getRadioValue(negotiable)
    price_value = price.value
    description_value = description.value

      
    
    if(price_value == '' || security_deposite_value == '' || negotiable_value == '' || description_value == ''){
        if(price.value == ''){
            document.querySelector('.price-inbox').style = "border: 1px solid red;"
            document.querySelector('.price-error-explainations').style = "display: block;"
            // document.getElementById('price').style = 'border: 1px solid red;'
            document.getElementById('price-error-mssg').style = 'display: block;'
        }

        if(security_deposite_value == undefined){
            document.querySelector('.security-error-explainations').style =  'display: block;';
            document.querySelector('.security-error-message').style =  'display: block;';
        }

        if(negotiable_value == undefined){
            document.querySelector('.negotiable-error-explainations').style =  'display: block;';
            document.querySelector('.negotiable-error-message').style =  'display: block;';
        }
        
        if( description_value == ''){
            document.querySelector('.description-error-explaination').style = 'display: block;';
            document.querySelector('.description-error-message').innerText = "Please fill in the description"
            document.querySelector('.description-error-message').style = 'color: red';
        }
    } else{

        var url = '/postData/'

        room_data = {'category': category_value, 'type': property_type_value,
        'address': address.value, 'bedroom': bedroom_value, 'bathroom': bathroom_value,
        'balconies': balconies_value, 'furnishing': furnishing_value,
        'age': property_age_value, 'rent_out_to': rent_out_to_value, 'price': price_value,
        'security': security_deposite_value, 'description': description_value,
        'negotiable': negotiable_value

        }

        for (const [key, value] of Object.entries(room_data)) {
            data.append(key, value)

        }

        fetch(url, {
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},

            body: data,
        })
        .then((response) =>{
            return response.json()
        })

        .then((data) =>{
            console.log(data)
            console.log(data['id'])
            window.location.href = `/room_detail/${data['id']}`
            // window.location.assign("{% url 'home' %}")
        })
    }

})


