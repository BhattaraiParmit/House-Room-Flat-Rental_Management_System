let progress_index = document.getElementById('progress')
let progress_box = document.querySelectorAll('.progress-box')
let form_steps = document.querySelectorAll('.form-step')
let next_btn = document.querySelector('.next-btn')

let back_btn = document.querySelector('.back-btn')
let footer = document.querySelector('.footer')

let bedroom = document.getElementById('id_bedroom')
let bathroom = document.getElementById('id_bathroom')
let balconies = document.getElementById('id_balconies')



let area = document.getElementById('id_area')
let description = document.getElementById('id_description')
let rentInput = document.getElementById('id_price')
let securityDepositeInput = document.getElementById('id_security_deposite')
let leaseInput = document.getElementsByName('lease_duration');

// let address = document.getElementById('id_address')

let errrorMessageBox = document.querySelector('.error-mssg-box')


let property_category = document.getElementById('id_category')
let property_type = document.getElementById('id_property_type')

let negotiable = document.getElementById('id_negotiable')
let renOutTo = document.getElementById('id_rent_out_to')

let petInput = document.getElementById('id_pets')
let parkingInput = document.getElementById('id_parking')
let furnishingInput = document.getElementById('id_furnishing')

let air_conditioner = document.getElementById('air-conditioner');
let electricityCheckbox = document.getElementById('electricity-checkbox');
let waterCheckbox = document.getElementById('water-checkbox');
let fansCheckbox = document.getElementById('fans');
let smokingCheckbox = document.getElementById('no-smoking');
let internetCheckbox = document.getElementById('internet');


let post_property_form = document.getElementById('post-property-form')


let imageUploadBtn = document.getElementById('card-upload-btn')
let Input = document.querySelector('.card-file')
let small_input = document.querySelector('.small-file')
let card = document.querySelector('.image-card');
let small_card = document.querySelector('.small-card-container')
let picture_section = document.querySelector('.image-container')
let small_upload_btn = document.getElementById('small-upload-btn')


let province = document.getElementById('id_province')
let city_select_box = document.getElementById('id_city')
let category_Select = document.getElementById('id_category')


let photoErrorMessage = document.querySelector('.error-mssg-box')
let backgroundOverlay  = document.getElementById('background-overlay')

let videosContainer = document.querySelector('.videos-container')

user_Name = document.getElementById('id_name')
user_email = document.getElementById('id_email')
user_phone = document.getElementById('id_phone')



let lease_duration_value = 0
let progressLineColor = 0
let area_value = 0
let rent_value  = 0
// let security_deposite_value = 0
let formStepNum = 0
let filesIndex = 0



let address_value = ''
let province_value = ''
let city_value = ''
let category_value = ''
let property_type_value = ''
let negotiable_value = '' 
let rentOutTo_value = '' 


let pet_value = ''
let parking_value = ''
let furnishng_value = ''

let bedroom_value = ''
let bathroom_value = ''
let balconies_value = ''

let airConditionerValue = ''
let electricityValue = ''
let waterValue = ''
let fansValue = ''
let smokingValue = ''
let internetValue = ''


let description_value = ''
let security_deposite_value = ''
let images = []
let files = []
let cardImage = []
let cover_photo = []
let deletedImage = []
let duplicate_Imageurl_files = []
let url_cover_photo = []

let cover_photo_index = 0

console.log("hello")


province.addEventListener('change', ()=>{

    console.log("hello")
    displayCity(province.value)

})




category_Select.addEventListener('change', ()=>{
    value = category_Select.value


    if(value == 'Sell'){
        console.log("hello")
        document.querySelector('.rent_out_to').style.display = 'none'

        form5 =  document.querySelector('.form5')

        console.log(form5.childNodes)
        console.log( form5.childNodes[1].innerText)
        form5.childNodes[1].innerText = 'How much is your Property Price?'
        console.log( form5.childNodes[1].innerText)

        form5.childNodes[3].innerText = 'Enter the valid amount'
        form5.childNodes[5].childNodes[1].childNodes
        form5.childNodes[5].childNodes[1].childNodes[0].innerText = "Selling Price"
        form5.childNodes[5].childNodes[3].childNodes[3].innerText= 'Price'  
    }



    if (value == 'Rent'){
        
        console.log('+++++++++++++===')
        form5 =  document.querySelector('.form5')

        document.querySelector('.rent_out_to').style.display = 'block'


        form5.childNodes[1].innerText = 'How much is the montly rent?'
        form5.childNodes[3].innerText = 'Enter the valid rent amount'
        form5.childNodes[5].childNodes[1].childNodes
        form5.childNodes[5].childNodes[1].childNodes[0].innerText = "Renting Price"
        form5.childNodes[5].childNodes[3].childNodes[3].innerText= '/month'
    }

    if(value == 'PG'){
        console.log('+++++++++++++===')

    }


})

back_btn.addEventListener('click', (e)=>{

    e.preventDefault()

    if(formStepNum > 0){

        if (next_btn.classList.contains('form2-btn')){

            next_btn.classList.remove(next_btn.classList[1])
            next_btn.classList.add("get-started-btn")
            next_btn.classList.add("form1-btn")


            back_btn.style.visibility = "hidden"
            formStepNum--
            console.log(formStepNum)
            updateFormStep(formStepNum)
            progressBar = 0
            updateProgressBar(progressBar)

            updateCheckProgress(0)
            document.getElementById('first-step-number').innerText = formStepNum

            console.log("hello")
            next_btn.innerText = "Get Started"
            
            return
        }


        else if(next_btn.classList.contains('form3-btn')){

            console.log("helelle")

            next_btn.classList.remove(next_btn.classList[1])
            next_btn.classList.add(`form${formStepNum}-btn`)

            formStepNum--
            updateFormStep(formStepNum)
            updateProgressLine('decrease')

            console.log('================', formStepNum)
            updateCheckProgress(1)
            document.getElementById('first-step-number').innerText = formStepNum
           
        }


        else if(next_btn.classList.contains('form5-btn')){

            console.log("helelle")

            next_btn.classList.remove(next_btn.classList[1])
            next_btn.classList.add(`form${formStepNum}-btn`)
            formStepNum--

            updateFormStep(formStepNum)
            updateProgressLine('decrease')

            updateCheckProgress(2)
            document.getElementById('first-step-number').innerText = formStepNum
        
        }

        else if(next_btn.classList.contains('form8-btn')){

            console.log("helelle")

            next_btn.classList.remove(next_btn.classList[1])
            next_btn.classList.add(`form${formStepNum}-btn`)

            formStepNum--
            updateFormStep(formStepNum)
            updateProgressLine('decrease')

            updateCheckProgress(3)
            document.getElementById('first-step-number').innerText = formStepNum

        }

        else if(next_btn.classList.contains('form9-btn')){

            console.log("helelle")

            next_btn.classList.remove(next_btn.classList[1])
            next_btn.classList.add(`form${formStepNum}-btn`)

            formStepNum--
            updateFormStep(formStepNum)
            updateProgressLine('decrease')
            updateCheckProgress(4)
            document.getElementById('first-step-number').innerText = formStepNum
           
        }

        else if(next_btn.classList.contains('form10-btn')){


            next_btn.classList.remove(next_btn.classList[1])
            next_btn.classList.add(`form${formStepNum}-btn`)

            formStepNum--
            updateFormStep(formStepNum)
            updateProgressLine('decrease')
            updateCheckProgress(5)
            document.getElementById('first-step-number').innerText = formStepNum

        }

        else if(next_btn.classList.contains('form11-btn')){


            next_btn.classList.remove(next_btn.classList[1])
            next_btn.classList.add(`form${formStepNum}-btn`)

            formStepNum--
            updateFormStep(formStepNum)
            updateProgressLine('decrease')
            updateCheckProgress(6)
            document.getElementById('first-step-number').innerText = formStepNum
            next_btn.innerText = "Next"
            
        }
        

        else{

            next_btn.classList.remove(next_btn.classList[1])
            next_btn.classList.add(`form${formStepNum}-btn`)

            formStepNum--
            updateFormStep(formStepNum)
            document.getElementById('first-step-number').innerText = formStepNum

        }

  
    }
    
    
})



document.addEventListener('DOMContentLoaded', () =>{
    // progress_index.style =  `width: 100% !important`
   
})



function updateCheckProgress(index){

    console.log('------------------------------', index)

    progress_box[index].classList.remove('progress-box-check')
    progress_box[index].innerHTML = '' 
    progress_box[index].classList.remove('progress-box-active')



    if(index == 0){
        progress_box[index].classList.remove('progress-box-check')
        progress_box[index].innerHTML = '' 

        progress_box[index].classList.remove('progress-box-active')

    }else{
        index = index -1


        progress_box[index].classList.remove('progress-box-check')
        progress_box[index].innerHTML = '' 
        progress_box[index].classList.add('progress-box-active')
    }

    console.log(index)

    
}




footer.addEventListener('click', (e) =>{    
    let backBtn = e.target.closest('back-btn')
    let form1_btn = e.target.closest('.form1-btn')
    let form2_btn = e.target.closest('.form2-btn')
    let form3_btn = e.target.closest('.form3-btn')
    let form4_btn = e.target.closest('.form4-btn')
    let form5_btn = e.target.closest('.form5-btn')
    let form6_btn = e.target.closest('.form6-btn')
    let form7_btn = e.target.closest('.form7-btn')
    let form8_btn = e.target.closest('.form8-btn')
    let form9_btn = e.target.closest('.form9-btn')
    let form10_btn = e.target.closest('.form10-btn')
    let form11_btn = e.target.closest('.form11-btn')
    

    if(form1_btn){
        e.preventDefault()
        form1_btn.classList.remove('form1-btn')
        form1_btn.classList.add('form2-btn')
        formStepNum++
        updateFormStep(formStepNum)
        updateProgressBar(0)

        document.getElementById('first-step-number').innerText = formStepNum
        document.querySelector('.back-btn').style.visibility = 'visible'

        next_btn.innerText = "Next"



    }

    if(form2_btn){
        e.preventDefault()
        checkFormValidation(form2_btn, 'form2-btn')
    }


    if(form3_btn){
        e.preventDefault()
        checkFormValidation( form3_btn, 'form3-btn')


    }
    if(form4_btn){
        e.preventDefault()
        checkFormValidation(form4_btn, 'form4-btn')


    }
    if(form5_btn){
        e.preventDefault()

        checkFormValidation( form5_btn, 'form5-btn')

    }
    if(form6_btn){
        e.preventDefault()
        checkFormValidation( form6_btn, 'form6-btn')

        
        form6_btn.classList.remove('form6-btn')
        form6_btn.classList.add('form7-btn')
        formStepNum++
        updateFormStep(formStepNum)
        document.getElementById('first-step-number').innerText = formStepNum


    }
    if(form7_btn){
        e.preventDefault()
        checkFormValidation(form7_btn, 'form7-btn')
    
    }

    if(form8_btn){
        e.preventDefault()
        getCheckBoxValue()

        form8_btn.classList.remove('form8-btn')
        form8_btn.classList.add('form9-btn')
        form8_btn.setAttribute('type', 'submit')

        formStepNum++
        updateFormStep(formStepNum)
        updateProgressBar(4)

        updateProgressLine('increase')
        updateProgressCheck(3)

        document.getElementById('first-step-number').innerText = formStepNum

       
    }

    if(form9_btn){
        e.preventDefault()
        checkFormValidation(form9_btn, 'form9-btn')
    }


    if(form10_btn){

        console.log("btn----")
        e.preventDefault()
        checkFormValidation(form10_btn, 'form10-btn')
        
        displayForm11Content()
        next_btn.innerText = "Submit"


    }

    if(form11_btn){
        e.preventDefault()
        displayFormSubmitOverlayDiv()
    }


})






function getCheckBoxValue(){

    pet_value = petInput.value
    parking_value = parkingInput.value
    furnishng_value = furnishingInput.value
    

    if(air_conditioner.checked == true){
        airConditionerValue = air_conditioner.value
    }else{
        airConditionerValue = 'None'
    }

    if(electricityCheckbox.checked == true){
        electricityValue = electricityCheckbox.value
    }else{
        electricityValue =  'None'
    }


    if(waterCheckbox.checked == true){
        waterValue = waterCheckbox.value
    }else{
        waterValue =  'None'
    }

    if(fansCheckbox.checked == true){
        fansValue = fansCheckbox.value
    }else{
        fansValue =  'None'
    }

    if(smokingCheckbox.checked == true){
        smokingValue = smokingCheckbox.value
    }else{
        smokingValue =  'None'
    }

    if(internetCheckbox.checked == true){
        internetValue = internetCheckbox.value
    }else{
        internetValue =  'None'
    }



}




function checkFormValidation(btn, label){

    
    if(label == 'form2-btn'){
        province_value = province.value
        city_value = city_select_box.value

        category_value = property_category.value
        property_type_value = property_type.value

        if(province_value == '' || city_value == ''){
            if(city_value == ''){
                city_select_box.style = "border: 1px solid red"
            }

            if(province_value == ''){
                console.log('empty')
                province.style = "border: 1px solid red"
            }
        }
        else{
            btn.classList.remove('form2-btn')
            btn.classList.add('form3-btn')
            formStepNum++
            updateFormStep(formStepNum)
            updateProgressBar(1)
            updateProgressLine('increase')
            updateProgressCheck(0)
            document.getElementById('first-step-number').innerText = formStepNum

        }
    }
     else if(label == 'form3-btn'){
        area_value = area.value
        negotiable_value = negotiable.value
        rentOutTo_value = renOutTo.value
        bedroom_value = bedroom.value
        bathroom_value = bathroom.value
        balconies_value = balconies.value

        if(area_value == ''){
            document.querySelector('.square-input').style = "border: 1px solid red"
        }else{
            btn.classList.remove('form3-btn')
            btn.classList.add('form4-btn')
            formStepNum++
            updateFormStep(formStepNum)

            document.getElementById('first-step-number').innerText = formStepNum

        }
    }
    else if(label == 'form4-btn'){
        
        description_value = description.value
        
        if(description_value == ''){
            description.style = "border: 1px solid red";

        }else{
            btn.classList.remove('form4-btn')
            btn.classList.add('form5-btn')
            formStepNum++
            updateFormStep(formStepNum)
            updateProgressBar(2)

            updateProgressLine('increase')
            updateProgressCheck(1)
            document.getElementById('first-step-number').innerText = formStepNum


        }

    } else if(label == 'form5-btn'){
        
        rent_value = rentInput.value

        if(rent_value == ''){
            document.querySelector('.price-input').style  = "border: 1px solid red";
        }else{

            btn.classList.remove('form5-btn')
            btn.classList.add('form6-btn')
            formStepNum++
            updateFormStep(formStepNum)

            document.getElementById('first-step-number').innerText = formStepNum

        }

    } else if(label == 'form6-btn'){
        security_deposite_value = securityDepositeInput.value
        
        if(securityDepositeInput.value == ''){
            security_deposite_value = 0
        }else{
            security_deposite_value = securityDepositeInput.value
        }


    } else if(label == 'form7-btn'){
        lease_duration_value = getRadioValue(leaseInput)

        if(lease_duration_value == undefined){
            return
        }else{
            btn.classList.remove('form7-btn')
            btn.classList.add('form8-btn')
            formStepNum++
            
            updateFormStep(formStepNum)
            updateProgressBar(3)
            
            updateProgressLine('increase')
            updateProgressCheck(2)
            document.getElementById('first-step-number').innerTe
        }


    }  else if(label == 'form9-btn'){

        if(files.length == 0){

            card.style = "border: 1px dashed red"
            errrorMessageBox.style.display = "flex"
            errrorMessageBox.childNodes[3].innerText = "At least one photo is required"
            console.log(errrorMessageBox)
            console.log('you cannot submit')
            return
        }else if(cover_photo.length == 0){
            errrorMessageBox.style.display = "flex"
            errrorMessageBox.childNodes[3].innerText = "Please select cover photo"
            return   
        }else{

            btn.classList.remove('form9-btn')
            btn.classList.add('form10-btn')


            formStepNum++
            updateFormStep(formStepNum)
            updateProgressBar(5)
            updateProgressLine('increase')
            updateProgressCheck(4)

            document.getElementById('first-step-number').innerText = formStepNum
        }

    } else if(label == 'form10-btn'){

        console.log("h=======================================================")
        let phone  = document.getElementById('id_phone')
        console.log("phone")
        if(phone.value == ''){
            console.log("empty")
            document.querySelector('.phone-input').style = "border: 1px solid red"
        }else{
            console.log("not empty")

            btn.classList.remove('form10-btn')
            console.log('removed')
            btn.classList.add('form11-btn')

            formStepNum++
            updateFormStep(formStepNum)
            updateProgressBar(6)
            updateProgressLine('increase')
            updateProgressCheck(5)
            document.getElementById('first-step-number').innerText = formStepNum
        }
    }

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


function displayFormSubmitOverlayDiv(){

    let formSubmitConfirm = document.querySelector('.form-submit-confirm')

    backgroundOverlay.style.display = 'block'
    formSubmitConfirm.style.display = 'block'


}





function updateFormStep(index){

    console.log(index)
   form_steps.forEach((form_step) =>{
    form_step.classList.contains('form-step-active') &&
    form_step.classList.remove('form-step-active')
   })

   form_steps[index].classList.add('form-step-active')

}



function updateProgressBar(index){
    console.log("hello")
    progress_box.forEach((box) =>{
        box.classList.contains(' progress-box-active') &&
        box.classList.remove('progress-box-active')

    })

    progress_box[index].classList.add('progress-box-active')

}


function updateProgressCheck(index){


    progressActive  = document.querySelectorAll('.progress-box-active')
    

    progress_box[index].classList.remove('progress-box-active')
    progress_box[index].innerHTML = '<i class="fa-solid fa-check"></i>' 
    progress_box[index].classList.add('progress-box-check')

}



function updateProgressLine(label){
    if(label == 'increase'){
        progressLineColor += 184;
        progress_index.style =  `width: ${progressLineColor}px !important`
    
    }else{
        progressLineColor -= 184;
        progress_index.style =  `width: ${progressLineColor}px !important`
    
    }

}



// ==============================Image Upload Section=====================================


imageUploadBtn.addEventListener('click', () =>{
    Input.click()
})

small_upload_btn.addEventListener('click', () =>{
    small_input.click()

})


Input.addEventListener('change', (e) =>{

    let file  = Input.files;
    let img = e.target.files


    if(files.length == 0){
        small_card.style = "display: block;"
    }

    for(var i = 0; i < file.length; i++){
        files.push(file[i])
        duplicate_Imageurl_files.push(file[i])



        display_image(file[i])

        
    }

 
    card.style = "display: none;"
    small_card.style = "display: block;"

    
})


// Input.addEventListener('change', (e) =>{

//     let file  = Input.files;
//     let img = e.target.files


//     if(files.length == 0){
//         small_card.style = "display: block;"
//     }



//     for(var i = 0; i < file.length; i++){
//         files.push(file[i])

//         display_image(files[i])
//     }

//     cover_photo.push(files[0])
    

//     display_image(files)

//     var cover_btn = document.querySelectorAll('.make-cover-photo')

//     cover_btn[cover_photo_index].classList.add("cover-photo-btn")
//     cover_btn[cover_photo_index].innerText = "cover Photo"


//     card.style = "display: none;"
//     small_card.style = "display: block;"

    
// })




small_input.addEventListener('change', () =>{
    let file  = small_input.files;


    for(var i = 0; i < file.length; i++){
        files.push(file[i])
        duplicate_Imageurl_files.push(file[i])
        // cardImage.push(file[i])

        console.log(cardImage)
        
        display_image(file[i])
    }


    card.style = "display: none;"
    small_card.style = "display: block;"
   

})



function display_image(e){

    let image = ''
    
    image = `<div class="image">
                   <img src="${URL.createObjectURL(e)}" alt="">
                     <i class="fa-solid fa-trash"  data-imageNumber = "${filesIndex++}"></i>
                     <div class="image-overlay"></div>
                     <div class="cover-zoom">
                         <p class = "make-cover-photo" >Make Cover photo</p>
                         <i class="fa-solid fa-magnifying-glass"></i>
                     </div>
            </div>`

    picture_section.innerHTML += image

            
}  





// function display_image(files){
    
//     picture_section.innerHTML = ''


//     for(var i = 0; i < files.length; i++){

//         let image = ''


//         try{

//             image = `<div class="image ${(cover_photo.length !=0)? (i==cover_photo_index)?'coverImage':'' :''}" >
//                         <img src="${URL.createObjectURL(files[i])}" alt="">
//                             <i class="fa-solid fa-trash" data-number = "${filesIndex++}"></i>
//                             <div class="cover-zoom">
//                                 <p class = "make-cover-photo  ${(cover_photo.length !=0)? (i==cover_photo_index)?'cover-photo-btn':'' :''}  " >Make Cover photo</p>
//                                 <i class="fa-solid fa-magnifying-glass"></i>
//                             </div>
//                     </div>`

//             picture_section.innerHTML += image

            
//         }

//         catch{
           
//             image = `<div class="image ${(cover_photo.length !=0)? (i==cover_photo_index)?'coverImage':'' :''}" >
//                         <img src="${files[i]}" alt="">
//                             <i class="fa-solid fa-trash" data-imageNumber = "${filesIndex++}"></i>
//                             <div class="cover-zoom">
//                                 <p class = "make-cover-photo  ${(cover_photo.length !=0)? (i==cover_photo_index)?'cover-photo-btn':'' :''}  " >Make Cover photo</p>
//                                 <i class="fa-solid fa-magnifying-glass"></i>
//                             </div>
//                     </div>`

//                 picture_section.innerHTML += image

//         }

//         // finally{

//         //     image = `<div class="image ${(cover_photo.length !=0)? (i==cover_photo_index)?'coverImage':'' :''}" >
//         //                 <img src="${URL.createObjectURL(files[i])}" alt="">
//         //                     <i class="fa-solid fa-trash" data-number = "${filesIndex++}"></i>
//         //                     <div class="cover-zoom">
//         //                         <p class = "make-cover-photo  ${(cover_photo.length !=0)? (i==cover_photo_index)?'cover-photo-btn':'' :''}  " >Make Cover photo</p>
//         //                         <i class="fa-solid fa-magnifying-glass"></i>
//         //                     </div>
//         //             </div>`

//         //     picture_section.innerHTML += image

//         // }
    
//     }
            
// } 




picture_section.addEventListener('click', function(e){
    const deleteEl = e.target.closest('.fa-trash')
    const imageEl = e.target.closest('img');
    const coverEl = e.target.closest('.make-cover-photo');
    

    if(deleteEl){


        console.log(files)
        console.log(duplicate_Imageurl_files)


        if(deleteEl.parentNode.classList.contains('coverImage')){

            console.log(cover_photo)
            cover_photo = []
            url_cover_photo = []

            cover_photo_index = 0


            if(deleteEl.parentNode.childNodes[1].dataset.id){
                deletedImage.push(deleteEl.parentNode.childNodes[1].dataset.id)       
            }
            
            console.log(deleteEl.dataset.imagenumber)
            
            files.splice(deleteEl.dataset.imagenumber, 1)

            duplicate_Imageurl_files.splice(deleteEl.dataset.imagenumber, 1)

            deleteEl.parentNode.remove()
            filesIndex--

        }else{


        imageContainer = document.querySelectorAll('.image')
        
        for(var i= 0; i< files.length; i++){
            console.log(files[i])
        }

        
        if(deleteEl.parentNode.childNodes[1].dataset.id){
            deletedImage.push(deleteEl.parentNode.childNodes[1].dataset.id)       
        }

        console.log(deleteEl.dataset.imagenumber)

        files.splice(deleteEl.dataset.imagenumber, 1)

        duplicate_Imageurl_files.splice(deleteEl.dataset.imagenumber, 1)

        
        for(var i= 0; i< files.length; i++){
            console.log(files[i])
        }
       
        deleteEl.parentNode.remove()
        filesIndex-- 

        }

        console.log(files)
        console.log(duplicate_Imageurl_files)

        if(filesIndex == 0){
            console.log("trigtedeed-------------------------")
            card.style = "display: flex"
            small_card.style = "display: none;"
            return
        }


      
        filesIndex = 0


        a = document.querySelectorAll('[data-imagenumber]')
        console.log(a)
        console.log(a.length)


        for(var i = 0; i < a.length; i++){
            a[i].dataset.imagenumber = filesIndex++
        }



    }

    if(imageEl){

    }

    if(coverEl){

        console.log('clicked')

        cover_photo = []
        url_cover_photo = []

        var cover_btn = document.querySelectorAll('.make-cover-photo')
        imageContainer = document.querySelectorAll('.image')

        for(var i = 0; i < cover_btn.length; i++){
            if(cover_btn[i].classList.contains("cover-photo-btn")){
                cover_btn[i].classList.remove("cover-photo-btn")
                
            }   
        }

        for(var i = 0; i < imageContainer.length; i++){
            if(imageContainer[i].classList.contains("coverImage")){
                imageContainer[i].classList.remove("coverImage")

            }   
        }




        coverEl.classList.add("cover-photo-btn")
        coverEl.parentNode.parentNode.classList.add('coverImage')
        coverEl.innerText = "cover Photo"


        for(var i = 0; i < cover_btn.length; i++){
            console.log(cover_btn)
            if(cover_btn[i].classList.contains("cover-photo-btn")){

                console.log(i)
                console.log(files)
                console.log(files[i])

                cover_photo.push(files[i])

                url_cover_photo.push(duplicate_Imageurl_files[i])
                
            }   
        }

        
    }
})



const VideoUploadBtn = document.getElementById('video-upload-btn')
const  videoInput = document.querySelector('.video-file')
const videoPlayer  = document.querySelector('.video-player')
const videoCard  = document.querySelector('.video-card')
const videoSource = document.getElementById('video-upload-btn')
const videoBox = document.querySelector('.video-box')
// const delImage = document.getElementById('delete-image')

let videos = []



VideoUploadBtn.addEventListener('click', ()=>{
    videoInput.click()
})


videoInput.addEventListener('change', (e)=>{
    console.log("changing")
    let file = videoInput.files[0]

    videos.push(file)
    videoCard.style.display= "none"

    console.log("file", file)
    showVideo(file)
    
})  




let deleted_video_id = ''


videosContainer.addEventListener('click', (e)=>{
    const delImage = e.target.closest('#delete-image')

    if(delImage){

        videos = []
        videoCard.style.display= "flex"
        videoBox.innerHTML = ''

        if(delImage.parentNode.childNodes[1].dataset.id){
            deleted_video_id = delImage.parentNode.childNodes[1].dataset.id
        }

    }


})


function showVideo(file){

        videoBox.innerHTML += `<div class="video">
                                <video class="video-player" controls>
                                    <source id="video-source" src="${URL.createObjectURL(file)}" type="video/mp4">
                                </video>

                                <i class="fa-solid fa-trash" id="delete-image"></i>
                            </div>`



    
}

function replaceInput(){

    document.querySelector('video-input').innerHTML = `<input type="file" name="file" class="video-file">`
}




// function displayVideo(file){
//     videoBox.innerHTML += `<div class="video">
//                                 <video class="video-player" controls>
//                                     <source id="video-source" src="${URL.createObjectURL(file)}" type="video/mp4">
//                                 </video>

//                                 <i class="fa-solid fa-trash" id="delete-image"></i>

//                             </div>`

// }



// ===========================Image Upload Section end======================================


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




post_property_form.addEventListener('submit', (e) =>{
    e.preventDefault()

    console.log("hadhaudah")
    data = new FormData()

    console.log("------", cover_photo)

    data.append("cover_images", cover_photo[0])

    
    data.append('videos', videos[0])
    



    for(var i = 0; i< deletedImage.length; i++){
        data.append('deletedImages', deletedImage[i])
    }
    
    for(var i = 0; i < files.length; i++){
                // console.log("files", files[i])
                data.append('images', files[i])
            }



    room_data = { 'id': id, 
                    'bedroom': bedroom_value, 
                    'bathroom': bathroom_value,  
                    'balconies': balconies_value, 
                    'area': area_value,
                    'description': description_value, 
                    'rent': rent_value, 
                    'security_deposite': security_deposite_value,
                    'lease_duration': lease_duration_value, 
                    'pet': pet_value, 
                    'parking': parking_value,
                    'furnishing': furnishng_value, 
                    'air_conditioner': airConditionerValue, 
                    'electricity': electricityValue,
                    'water': waterValue, 
                    'fans': fansValue, 
                    'internet': internetValue , 
                    'smoking': smokingValue, 
                    'address': address_value,
                    'category': category_value, 
                    'type': property_type_value, 
                    'negotiable': negotiable_value, 
                    'rent_out_to': rentOutTo_value,
                    'deleted_video_id': deleted_video_id,
                       
                }


    for (const [key, value] of Object.entries(room_data)) {
        data.append(key, value)

    }
    


    var url = '/saveEditedProperty/'

    fetch(url, {
        method: 'POST',
        headers : {'X-CSRFToken': csrftoken},

        body: data
    })
    .then((response) =>{
        return response.json()
    })

    .then((data) =>{
        console.log(data)
        window.location.href = `/property-list`
    })

    

    
})





function displayCity(province_value){

    console.log(province_value)

    var url = "/getEditPropertyCityName/"

    fetch(url, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',  
            'X-CSRFToken': csrftoken
        },

        body: JSON.stringify({'value': province_value})

    })
    .then((response) =>{
        return response.json()
    })
    .then((data) =>{

        console.log(data)

        a = data.city
        
        city = JSON.parse(a)
       
        console.log(city)
        console.log(city.length)

        city_select_box.innerHTML = ''
        
        for(var i = 0; i< city.length; i++){
            city_select_box.innerHTML += `<option value="${city[i].fields.name}">${city[i].fields.name}</option>`
        }

    })
   


}

// ==================================================================================




let form11Image = document.getElementById('form11-image')
let roomDetailTitle = document.getElementById('roomDetail-title')
let roomDetailAddress = document.getElementById('roomDetail-address')
let roomDetailPrice = document.getElementById('roomDetail-price')

let roomDetailBedroom = document.querySelector('.roomDetail-bed')
let roomDetailBathroom = document.querySelector('.roomDetail-bath')
let roomDetailArea = document.querySelector('.roomDetail-area')





let propertyDetailHeader = document.querySelector('.property-detail-header')
let mediaDetailHeader = document.querySelector('.media-detail-header')
let amenitiesDetailHeader = document.querySelector('.amenities-detail-header')
let finalDetailHeader = document.querySelector('.final-detail-header')


let property_Detail_Body = document.querySelector('.property-detail-body')
let media_Detail_Body = document.querySelector('.media-detail-body')
let amenities_Detail_Body = document.querySelector('.amenities-detail-body')
let final_Detail_Body = document.querySelector('.final-detail-body')


let property_Detail_Price = document.getElementById('properttyDetail-price')
let securityDeposite_Detail_Price = document.getElementById('securityDepositeDetail-price')
let description_Detail_Price = document.getElementById('description-detail')
let leaseDuration_Detail_Price = document.getElementById('leaseDuration-detail')

let property_edit = document.getElementById('property_edit')
let security_edit = document.getElementById('security_edit')
let description_edit = document.getElementById('description_edit')
let lease_edit = document.getElementById('lease_edit')


let property_price_overlay = document.querySelector('.property_price_overlay')


let Property_Detail = document.querySelector('.property-detail')
let Amenities_Detail = document.querySelector('.amenities-detail')



let propertyPriceSaveBtn = document.getElementById('propertyPriceSaveBtn')
let cancelFormSubmit = document.getElementById('cancel-form-submit')


Property_Detail.addEventListener('click', (e)=>{
    const priceEdit  = e.target.closest('#property_edit')
    const securityEdit  = e.target.closest('#security_edit')
    const descriptionEdit  = e.target.closest('#description_edit')
    const leaseeEdit  = e.target.closest('#lease_edit')
    

    const closeBtn = e.target.closest('.fa-xmark')
    const cancelBtn = e.target.closest('#cancel')

    const propertyPriceSaveBtn = e.target.closest('#propertyPriceSaveBtn')
    const propertySecurityDepositeSaveBtn = e.target.closest('#propertySecurityDepositeSaveBtn')
    const propertyDescriptionSaveBtn = e.target.closest('#propertyDescriptionSaveBtn')
    const propertyLeaseSaveBtn = e.target.closest('#propertyLeaseSaveBtn')




    if(priceEdit){
        backgroundOverlay.style.display = 'block'
        property_price_overlay.style.display = 'block'

    }


    if(securityEdit){
        backgroundOverlay.style.display = 'block'
        document.querySelector('.security_deposite_overlay').style.display = 'block'
    }

    if(descriptionEdit){
        backgroundOverlay.style.display = 'block'
        document.querySelector('.description_overlay').style.display = 'block'
    }

    if(leaseeEdit){
        backgroundOverlay.style.display = 'block'
        document.querySelector('.Lease_overlay').style.display = 'block'
    }

    if(closeBtn){

        console.log("hello")
        backgroundOverlay.style.display = 'none'
        console.log(closeBtn.parentNode.parentNode)
        closeBtn.parentNode.parentNode.parentNode.style.display = 'none'
    }

    if(cancelBtn){
        e.preventDefault()
        backgroundOverlay.style.display = 'none'
        cancelBtn.parentNode.parentNode.style.display = 'none'
    }

    if(propertyPriceSaveBtn){
        e.preventDefault()
        console.log("hello")

        
        if(document.getElementById('id_overlay_price_value').value == ''){
            console.log("empty")
        }else{
            propertyPriceSaveBtn.innerHTML += ` <div class="button-overlay"></div>
                                                <div class="circle"></div>`
            
            let Property_price =  document.getElementById('id_overlay_price_value').value

            rent_value = Property_price

            rentInput.value = Property_price
            roomDetailPrice.innerText = Property_price
            property_Detail_Price.innerText = Property_price

            setTimeout(function () {
                propertyPriceSaveBtn.innerHTML = 'Save'
                backgroundOverlay.style.display = 'none'
                document.querySelector('.property_price_overlay').style.display = 'none'

            }, 1000);
        }
    }


    if(propertySecurityDepositeSaveBtn){

        e.preventDefault()

        if(document.getElementById('id_overlay_security_value').value == ''){
            console.log("empty")
        }else{
            propertySecurityDepositeSaveBtn.innerHTML += ` <div class="button-overlay"></div>
                                                <div class="circle"></div>`
            
            let security_deposite_overlay_value =  document.getElementById('id_overlay_security_value').value

            security_deposite_value = security_deposite_overlay_value

            securityDepositeInput.value = security_deposite_overlay_value
            securityDeposite_Detail_Price.innerText = security_deposite_overlay_value

            setTimeout(function () {
                propertySecurityDepositeSaveBtn.innerHTML = 'Save'
                backgroundOverlay.style.display = 'none'
                document.querySelector('.security_deposite_overlay').style.display = 'none'

            }, 500);
        }
    }

    if(propertyDescriptionSaveBtn){
        e.preventDefault()

        
        if(document.getElementById('description_overlay_value').value == ''){
            console.log("empty")
        }else{
            propertyDescriptionSaveBtn.innerHTML += ` <div class="button-overlay"></div>
                                                <div class="circle"></div>`
            
            let descriptionValue =  document.getElementById('description_overlay_value').value

            description_value = descriptionValue

            description.value = descriptionValue

            description_Detail_Price.innerText = descriptionValue

            setTimeout(function () {
                propertyDescriptionSaveBtn.innerHTML = 'Save'
                backgroundOverlay.style.display = 'none'
                document.querySelector('.description_overlay').style.display = 'none'

            }, 500);

        }
    }

    if(propertyLeaseSaveBtn){
        e.preventDefault()

        let leaseOverlay = document.getElementsByName('lease_overlay_duration')


        if(document.getElementById('id_lease_overlay_duration_0').checked){
            document.getElementById('id_lease_duration_0').checked = true
        }
    
        if(document.getElementById('id_lease_overlay_duration_1').checked){
            document.getElementById('id_lease_duration_1').checked = true
        }
        if(document.getElementById('id_lease_overlay_duration_2').checked){
            document.getElementById('id_lease_duration_2').checked = true
        }
        if(document.getElementById('id_lease_overlay_duration_3').checked){
            document.getElementById('id_lease_duration_3').checked = true
        }
        if(document.getElementById('id_lease_overlay_duration_4').checked){
            document.getElementById('id_lease_duration_4').checked = true
        }

        lease_duration_value = getRadioValue(leaseOverlay)

        document.getElementById('leaseDuration-detail').innerText = lease_duration_value

        propertyLeaseSaveBtn.innerHTML += ` <div class="button-overlay"></div>
                                                <div class="circle"></div>`



        setTimeout(function () {
            propertyLeaseSaveBtn.innerHTML = 'Save'
            backgroundOverlay.style.display = 'none'
            document.querySelector('.Lease_overlay').style.display = 'none'

        }, 500);

    }
})






Amenities_Detail.addEventListener('click', (e)=>{
    const amenities_edit = e.target.closest('#amenities_edit')
    const closeBtn = e.target.closest('.fa-xmark')
    const amenitiesSaveBtn = e.target.closest('#amenitiesSaveBtn')
    const cancelBtn = e.target.closest('#cancel')


    if(amenities_edit){
        backgroundOverlay.style.display = 'block'
        document.querySelector('.amenities_overlay').style.display = 'block'
    }


    if(closeBtn){

        backgroundOverlay.style.display = 'none'
        console.log(closeBtn.parentNode.parentNode)
        closeBtn.parentNode.parentNode.parentNode.style.display = 'none'
    }

    if(amenitiesSaveBtn){
        e.preventDefault()

        let air_conditioner_checkbox = document.getElementById('id_air_conditioner')
        let electricity_checkbox = document.getElementById('id_electricity_checkbox')
        let water_checkbox = document.getElementById('id_water_checkbox')
        let fans_checkbox = document.getElementById('id_fans')
        let noSmoking_checkbox = document.getElementById('id_no_smoking')
        let internet_checkbox = document.getElementById('id_internet')

        document.querySelector('.amenities').innerHTML = ''

        if(air_conditioner_checkbox.checked == true){
            airConditionerValue = air_conditioner_checkbox.value

            document.getElementById('air-conditioner').checked = true
            document.querySelector('.amenities').innerHTML += '<P>Air Condition</P>'

        }else{
            document.getElementById('air-conditioner').checked = false
            airConditionerValue = 'None'
        }
    
        if(electricity_checkbox.checked == true){
            electricityValue = electricity_checkbox.value
            document.getElementById('electricity-checkbox').checked = true
            document.querySelector('.amenities').innerHTML += '<P>Electricity</P>'

        }else{
            electricityValue = 'None'
            document.getElementById('electricity-checkbox').checked = false

        }
    
        if(water_checkbox.checked == true){
            waterValue = water_checkbox.value

            document.getElementById('water-checkbox').checked = true
            document.querySelector('.amenities').innerHTML += '<P>Water</P>'
            
        }else{
            document.getElementById('water-checkbox').checked = false
            waterValue = 'None'
        }
    
        if(fans_checkbox.checked == true){
            fansValue = fans_checkbox.value

            document.getElementById('fans').checked = true
            document.querySelector('.amenities').innerHTML += '<P>Fans</P>'
            
        }else{
            document.getElementById('fans').checked = false
            fansValue = 'None'
        }
    
        if(noSmoking_checkbox.checked == true){
            smokingValue = noSmoking_checkbox.value

            document.getElementById('no-smoking').checked = true
            document.querySelector('.amenities').innerHTML += '<P>No Smoking</P>'
            
        }else{
            document.getElementById('no-smoking').checked = false
            smokingValue = 'None'
        }
    
        if(internet_checkbox.checked == true){
            internetValue = internet_checkbox.value

            document.getElementById('internet').checked = true
            document.querySelector('.amenities').innerHTML += '<P>Internet</P>'
            
        }else{
            document.getElementById('internet').checked = false
            internetValue = 'None'
        }

       

        amenitiesSaveBtn.innerHTML += `<div class="button-overlay"></div>
                                        <div class="circle"></div>`


        setTimeout(function () {
            amenitiesSaveBtn.innerHTML = 'Save'
            backgroundOverlay.style.display = 'none'
            document.querySelector('.amenities_overlay').style.display = 'none'

        }, 500);





    }

    if(cancelBtn){
        e.preventDefault()
        backgroundOverlay.style.display = 'none'
        cancelBtn.parentNode.parentNode.style.display = 'none'
    }






})





property_edit.addEventListener('click', ()=>{
    backgroundOverlay.style.display = 'block'

})





propertyDetailHeader.addEventListener('click', ()=>{
    console.log(propertyDetailHeader.childNodes)

    if(propertyDetailHeader.childNodes[1].classList.contains('fa-angle-up')){
        propertyDetailHeader.childNodes[1].classList.remove('fa-angle-up')
        propertyDetailHeader.childNodes[1].classList.add('fa-angle-down')
    }

    else if(propertyDetailHeader.childNodes[1].classList.contains('fa-angle-down')){
        propertyDetailHeader.childNodes[1].classList.remove('fa-angle-down')
        propertyDetailHeader.childNodes[1].classList.add('fa-angle-up')
    }

    property_Detail_Body.classList.toggle('show-property-detail-body')

})




mediaDetailHeader.addEventListener('click', ()=>{

    if(mediaDetailHeader.childNodes[1].classList.contains('fa-angle-up')){
        mediaDetailHeader.childNodes[1].classList.remove('fa-angle-up')
        mediaDetailHeader.childNodes[1].classList.add('fa-angle-down')
    }

    else if(mediaDetailHeader.childNodes[1].classList.contains('fa-angle-down')){
        mediaDetailHeader.childNodes[1].classList.remove('fa-angle-down')
        mediaDetailHeader.childNodes[1].classList.add('fa-angle-up')
    }



    media_Detail_Body.classList.toggle('show-media-detail-body')  
})



amenitiesDetailHeader.addEventListener('click', ()=>{

    if(amenitiesDetailHeader.childNodes[1].classList.contains('fa-angle-up')){
        amenitiesDetailHeader.childNodes[1].classList.remove('fa-angle-up')
        amenitiesDetailHeader.childNodes[1].classList.add('fa-angle-down')
    }

    else if(amenitiesDetailHeader.childNodes[1].classList.contains('fa-angle-down')){
        amenitiesDetailHeader.childNodes[1].classList.remove('fa-angle-down')
        amenitiesDetailHeader.childNodes[1].classList.add('fa-angle-up')
    }

    amenities_Detail_Body.classList.toggle('show-amenities-detail-body')
})



finalDetailHeader.addEventListener('click', ()=>{

    if(finalDetailHeader.childNodes[1].classList.contains('fa-angle-up')){
        finalDetailHeader.childNodes[1].classList.remove('fa-angle-up')
        finalDetailHeader.childNodes[1].classList.add('fa-angle-down')
    }

    else if(finalDetailHeader.childNodes[1].classList.contains('fa-angle-down')){
        finalDetailHeader.childNodes[1].classList.remove('fa-angle-down')
        finalDetailHeader.childNodes[1].classList.add('fa-angle-up')
    }

    final_Detail_Body.classList.toggle('show-final-detail-body')  
})





function displayForm11Content(){

    try{
        form11Image.src = URL.createObjectURL(url_cover_photo[0])

    }catch{
        form11Image.src = url_cover_photo[0]
    }

    roomDetailTitle.innerText = `${bedroom_value} BHk ${property_type_value} ${category_value} in ${city_value}`
    roomDetailPrice.innerText = rent_value

    roomDetailBedroom.innerText = bedroom_value
    roomDetailBathroom.innerText = bathroom_value
    roomDetailArea.innerText = area_value


    //displaying propertyDetail 
    property_Detail_Price.innerText = rent_value
    securityDeposite_Detail_Price.innerText = security_deposite_value
    description_Detail_Price.innerText = description_value
    leaseDuration_Detail_Price.innerText = lease_duration_value

    /// displaying property_Price_Detail 
    document.getElementById('id_overlay_price_value').value = rent_value
    
    /// displaying property_security_Detail 
    document.getElementById('id_overlay_security_value').value = security_deposite_value


    /// displaying property_security_Detail 
    document.getElementById('description_overlay_value').value = description_value

    /// displaying property_lease_Detail 

    if(document.getElementById('id_lease_duration_0').checked){
        document.getElementById('id_lease_overlay_duration_0').checked = true
    }

    if(document.getElementById('id_lease_duration_1').checked){
        document.getElementById('id_lease_overlay_duration_1').checked = true
    }
    if(document.getElementById('id_lease_duration_2').checked){
        document.getElementById('id_lease_overlay_duration_2').checked = true
    }
    if(document.getElementById('id_lease_duration_3').checked){
        document.getElementById('id_lease_overlay_duration_3').checked = true
    }
    if(document.getElementById('id_lease_duration_4').checked){
        document.getElementById('id_lease_overlay_duration_4').checked = true
    }




    //displaying media image    
    media_Detail_Body.childNodes[1].childNodes[3].innerHTML = ''
    // media_Detail_Body.childNodes[1].childNodes[3].childNodes.innerHTML = ''

    for(var i = 0; i< duplicate_Imageurl_files.length; i++){

        try{
            media_Detail_Body.childNodes[1].childNodes[3].innerHTML  += ` <div class="image" >
                                                                            <img src="${URL.createObjectURL(duplicate_Imageurl_files[i])}" alt="">                                                
                                                                        </div>`
        }
        catch{

            media_Detail_Body.childNodes[1].childNodes[3].innerHTML  += `<div class="image" >
                                                                            <img src="${duplicate_Imageurl_files[i]}" alt="">                                                
                                                                        </div>`

        }
       
    }

    //displaying media video

    if(videos.length != 0){
        console.log("++++++++++++++++++++++++++")
        try{
            console.log( media_Detail_Body.childNodes[3].childNodes[3])

            media_Detail_Body.childNodes[3].childNodes[3].innerHTML = ''
            media_Detail_Body.childNodes[3].childNodes[3].innerHTML += `<video class="video-player" controls>
                                                                                    <source id="video-source" src="${URL.createObjectURL(videos[0])}" type="video/mp4">
                                                                             </video>`
            console.log("99")
        }catch{
            console.log( media_Detail_Body.childNodes[3].childNodes[3])
            console.log(videos[0])
            media_Detail_Body.childNodes[3].childNodes[3].innerHTML = ''
            media_Detail_Body.childNodes[3].childNodes[3].innerHTML += `<video class="video-player" controls>
                                                                                    <source id="video-source" src="${video_url}" type="video/mp4">
                                                                 </video>`
            console.log( media_Detail_Body.childNodes[3].childNodes[3])
            console.log('qqjqqqqjj')
        }
       
    }else{

        media_Detail_Body.childNodes[3].childNodes[3].innerHTML = ''
        media_Detail_Body.childNodes[3].childNodes[3].innerHTML += ` <video class="video-player" controls>
                                                                                <source id="video-source" src="" type="video/mp4">
                                                                            </video>`
    }



   
    // displaying amenities Detail

    amenities_Detail_Body.childNodes[1].childNodes[3].innerHTML = ''


    if(air_conditioner.checked == true){
        amenities_Detail_Body.childNodes[1].childNodes[3].innerHTML += '<P>Air Condition</P>'
        document.getElementById('id_air_conditioner').checked = true
    }else{
        document.getElementById('id_air_conditioner').checked = false
        
    }

    if(electricityCheckbox.checked == true){
        amenities_Detail_Body.childNodes[1].childNodes[3].innerHTML += '<P>Electricity</P>'
        document.getElementById('id_electricity_checkbox').checked = true
        
    }else{
        document.getElementById('id_electricity_checkbox').checked = false

    }

    if(waterCheckbox.checked == true){
        amenities_Detail_Body.childNodes[1].childNodes[3].innerHTML += '<P>Water</P>'
        document.getElementById('id_water_checkbox').checked = true
        
        
    }else{
        document.getElementById('id_water_checkbox').checked = false

    }

    if(fansCheckbox.checked == true){
        amenities_Detail_Body.childNodes[1].childNodes[3].innerHTML += '<P>Fans</P>'
        document.getElementById('id_fans').checked = true   
    }else{
        
        document.getElementById('id_fans').checked = false   

    }

    if(smokingCheckbox.checked == true){
        amenities_Detail_Body.childNodes[1].childNodes[3].innerHTML += '<P>Smoking</P>'
        document.getElementById('id_no_smoking').checked = true  
    }else{
        document.getElementById('id_no_smoking').checked = false  


    }

    if(internetCheckbox.checked == true){
        amenities_Detail_Body.childNodes[1].childNodes[3].innerHTML += '<P>Internet</P>'
        document.getElementById('id_internet').checked = true 
    }else{
        document.getElementById('id_internet').checked = false
        
    }




    //displaying final detail
    Name = document.getElementById('final_detail_name')
    email = document.getElementById('final_detail_email')
    phone = document.getElementById('final_detail_phone')

    Name.innerText = user_Name.value
    email.innerText = user_email.value
    phone.innerText = user_phone.value



}



cancelFormSubmit.addEventListener('click', (e)=>{
    e.preventDefault()

    backgroundOverlay.style.display = 'none'
    document.querySelector('.form-submit-confirm').style.display = 'none'
})




window.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('.back-btn').style.visibility = 'hidden'
})







