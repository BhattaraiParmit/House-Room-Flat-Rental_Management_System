var reviewBtn = document.getElementById("write_review")
var overlay = document.querySelector('.review-overlay')
var reviewPostContainer = document.querySelector('.review-post-container')
var RatingStar = document.querySelectorAll('.rating-star')
var review_form = document.getElementById('review_form')


let averageReview = document.getElementById('average-review')
var header = document.getElementById('exampleInputHeader')

var message = document.getElementById('exampleFormControlTextarea')

var reviewcloseBtn = document.querySelector('.revie-section-close-btn')

var savedHomeIcon = document.querySelector('.fa-heart')

let ratingbody = document.querySelector('.stars')

let reviewDetail = document.querySelector('.review-detail')


let rating_value = '5'
let header_value = ''
let message_value = ''

var currentUrl = window.location.href
var strs = currentUrl.split()



let review_id = ''
let full_name  = ''
let Star = ''
let date = ''
let review_title = ''
let description = ''





console.log("totalstar", totalStar)



displayAverageRating(totalStar, reviews)


function displayAverageRating(totalStar, reviews){

    let averageRating = 0
    
    averageRating = parseInt(totalStar)/ parseInt(reviews)
    console.log(typeof(averageRating))

    if(averageRating){


        if (Number.isInteger(averageRating)){
            averageReview.innerText = averageRating

        }else{
            averageReview.innerText = parseFloat(averageRating).toFixed(1);

        }
    }else{
        averageReview.innerText = '0'

    }
    
        


    // averageReview.innerText = (parseInt(totalStar)/ parseInt(reviews))

}




function displayAverageStar(totalStar, totalReview){

    var averageRating = 0
    var i = 0
    var r = 0
   
    averageRating = totalStar / totalReview

    
    var j = averageRating

    ratingbody.innerHTML = ''

    for(var i = 5; i>= 0; i--){

        for(var j; j >= 0; j--){

            if(j >= 1){
                
                i--
                ratingbody.innerHTML += `<i class="fa-solid fa-star"></i>`

            }

            if(j == 0){
                break
            }
        
            if (j < 1){
                
                j = j - j

                i--
                ratingbody.innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`
            }


            
        }

        if(i == 0){
            break
        }

        ratingbody.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg>`
        
    }

}






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



document.querySelector('.Review-container').addEventListener('click', (e)=>{
    const review_btn = e.target.closest('#write_review')

    if(review_btn){

        if(user == 'AnonymousUser'){
            // displayLoginContainer()
            window.location.href = "/login"
    
        }else{
            navbar.classList.toggle('sticky')
            document.querySelector('body').style = "overflow: hidden"
            overlay.style = "display: block"
            reviewPostContainer.style = "display: block"
        }
    }
})





reviewcloseBtn.addEventListener('click', () =>{
    
    overlay.style = "display: none"
    document.querySelector('body').style = "overflow: scroll"
    reviewPostContainer.style = "display: none"
})




RatingStar.forEach((btn, i) =>{
    btn.addEventListener('click', () =>{

        updateStarButtons(i)
        rating_value = btn.dataset.number
    })
})



function updateStarButtons(i){
    RatingStar.forEach((btn) =>{
        btn.classList.contains('selected') &&
        btn.classList.remove('selected')
    })

    RatingStar[i].classList.add('selected')
}



var review_section = document.querySelector('.review-section')


// showing review by taking from template

showReview(rating, review_section)




function showReview(rating, review_section){

        
    if(rating.length == 0){

        document.querySelector('.empty-review-section').style = 'display: flex'
        console.log('empty')
    }else{


        for(var i = 0; i< rating.length; i++){

            console.log(user)

            let s = rating[i].fields.rating
        
            review_section.innerHTML += `<div class="review-body">

                                            <div class="header-top">
                                                <p class="name">${rating[i]['fields']['full_name']}</p> ${ user == rating[i]['fields']['email'] ? `<i class="fa-solid fa-trash" onclick="deleteReview(this)" data-star= "${rating[i].fields.rating}" data-number="${rating[i].pk}"></i>`: '' }

                                    
                                            </div>

                                             ${(getStars(rating[i]['fields']['rating']))}

                                            <div class="date">
                                                <p>${rating[i]['fields']['updated_date']}</p>
                                            </div>
                                            
                                            <div class="headline">
                                                <h2>${rating[i]['fields']['title']}</h2>
                                            </div>
                                            <div class="review-mssg">
                                                <p>${getRatingMssg(rating[i]['fields']['message'])}</p>
                                            </div>
                                            
                                            <div class="user-reply-section">
                                                <div class="reply_section">
                                                    <p>Property Owner Respond</p>
                                                    <small>Aug 7, 2022</small>
                                                </div>
                                            </div>

                                            <div class="read-more"  onclick="showReviewDetail('${rating[i].pk}', '${rating[i]['fields']['full_name']}', '${rating[i]['fields']['rating']}', '${rating[i]['fields']['created_date']}',  '${rating[i]['fields']['title']}', '${rating[i]['fields']['message']}', '${ rating[i]['fields']['email']}')">
                                                <p>Read More</p>
                                            </div>
                                        </div>`




            if(review_section.offsetHeight >= 705){

                review_section.classList.add('limited_height')

            }

        }
    }

}




let readMore  = document.querySelector('.read-more')


console.log("owenr", user)


function showReviewDetail(review_id, full_name, Star, date, review_title, description, email){

   

    response = getReplyMessage(review_id)



    reviewDetail.innerHTML = ''

    reviewDetail.innerHTML = ` <div class="review-body">
                                    <div class="header-top">
                                        <p class="name">${full_name}</p>
                                        <i class="fa-solid fa-xmark" onclick = "closeReviewDetail()" ></i>
                                    </div>
                                    
                                    ${(getStars(Star))}
                                    
                                    <div class="date">
                                        <p>${formatDate(date)}</p>
                                    </div>
                                    <div class="headline">
                                        <h2>${review_title}</h2>
                                    </div>
                                    <div class="review-mssg">
                                         <p>${description}</p>
                                    </div>

                                    <div class="owner-response-section">
                                       
                                    </div>


                                    <div class="owner-reply-section" data-id = "${review_id}">
                                        <textarea name="" id="" cols="30" rows="10">

                                        </textarea>

                                        <button id = "mssgSubmitButton" >Send</button>
                                    </div>

                                </div>`


}




function getReplyMessage(review_id){

    message = ''

    var url = "/getReviewReply/"


    fetch(url, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',  
            'X-CSRFToken': csrftoken
        },

        body: JSON.stringify({'id': review_id})
    })
    .then((response) =>{
        return response.json()
    })

    .then((data) =>{
        console.log(data)

        message = JSON.parse(data.replay_message)


        for(var i = 0; i<message.length; i++){

            let owner_section_response = document.querySelector('.owner-response-section') 


            owner_section_response.innerHTML += `<div class="reply_section">
                                                        <p>Property Owner Respond</p>
                                                        <small>${message[i].fields.message}</small>
                                                </div>`
        }

       
    })

}




function getStars(e){
    e = parseInt(e)

    let stars = document.createElement('div')

    stars.classList.add('stars')

    var i = 0
    
    for(i; i< 5; i++){
        for(i; i < e; i++){
            stars.innerHTML +=`<i class="fa-solid fa-star"></i>`
        
        }
        if(i == 5){
            break
        }else{

        
        stars.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>`

        }

    }

    a = ""
    a = `${stars}`

 
    return stars.outerHTML
}




function closeReviewDetail(){
    reviewDetail = document.querySelector('.review-detail')

    reviewDetail.innerHTML = ''

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





function deleteReview(e){

    console.log("+++++++++++++++++++++++++++++++++++++++=")
    delete_id = e.dataset.number
    review_star = e.dataset.star
    e.parentNode.parentNode.remove()

    console.log(review_section.offsetHeight )

    review_section.classList.remove('limited_height')

    if(review_section.offsetHeight < 705){
        review_section.classList.remove('limited_height')
    }else{
        review_section.classList.add('limited_height')

    }


  
    var url = '/deleteReview/'

    fetch(url, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',  
            'X-CSRFToken': csrftoken
        },

        body: JSON.stringify({'id': delete_id, 'review_star': review_star, 'property_id': id})
    })
    .then((response) =>{
        return response.json()
    })

    .then((data) =>{
        console.log(data)


        totalStar = data['totalStar']
        totalReview = data['totalReview']

        displayAverageRating(totalStar, totalReview)
        displayAverageStar(totalStar, totalReview)

    })


    
}






function getRatingMssg(e){

    text = ''

    if(e.length > 127){
        e = `${e.substring(0, 127)}...` 
    }

    return e

}






function getAverageRating(reviews, rating){
    var averageRating = 0
    var totalRating = 0
    var i = 0
    var r = 0


    for(var r = 0; r < reviews.length; r++){
        totalRating += parseInt(reviews[r].fields.rating)
    }

   
    // averageRating = Math.round(totalRating / rating)
    averageRating = totalRating / rating

    // if(averageRating){
    //     document.getElementById('review').innerHTML = averageRating
    // }else{
    //     document.getElementById('review').innerHTML = 0

    // }

    
    var j = averageRating

    ratingbody.innerHTML = ''

    for(var i = 5; i>= 0; i--){

        for(var j; j >= 0; j--){

            if(j >= 1){
                
                i--
                ratingbody.innerHTML += `<i class="fa-solid fa-star"></i>`

            }

            if(j == 0){
                break
            }
        
            if (j < 1){
                
                j = j - j

                i--
                ratingbody.innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`
            }


            
        }

        if(i == 0){
            break
        }

        ratingbody.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  class="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg>`
        
    }

}



getAverageRating(rating, reviews)




function getRatingStar(e, stars){


    e = parseInt(e)

    var i = 0
    
    for(i; i< 5; i++){
        for(i; i < e; i++){
            stars.innerHTML += `<i class="fa-solid fa-star"></i>`
        
        }
        if(i == 5){
            break
        }else{

        
        stars.innerHTML += ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  class="bi bi-star" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>`

        }

    }

}






function savedHomesFunction(id, icon){
    if(user == 'AnonymousUser'){
        window.location.href = "/login"
        // displayLoginContainer()
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




window.addEventListener('scroll', ()=>{

    var message_section = document.querySelector('.message-section')
    let body = document.querySelector("body");
    let first_column = document.querySelector('.first-column')
    message_section = document.querySelector('.message-section')


    if(window.scrollY > 560){
        navbar.classList.add('sticky')
        // message_section.classList.add('sticky')

        // body.style.overflow = "hidden"
        // first_column.style = "overflow-y = scroll"
    }else{
        navbar.classList.remove('sticky')
        // message_section.classList.remove('sticky')

    }

    // navbar.classList.toggle('sticky', window.scrollY > 560)
    // if(window.scrollY > 565){
    //    navbar.classList.toggle('sticky')

    // }
})




resopnse_form  = document.getElementById('response_form')


console.log(resopnse_form)





reviewDetail.addEventListener('click', (e)=>{
    const mssgSubmitButton = e.target.closest('#mssgSubmitButton')


    if(mssgSubmitButton){
        e.preventDefault()

        mssg = mssgSubmitButton.parentNode.childNodes[1].value
        console.log(mssgSubmitButton.parentNode)
        review_id =  mssgSubmitButton.parentNode.dataset.id



        console.log(mssg)
        console.log(review_id)


        if(mssg == ''){
            mssgSubmitButton.parentNode.childNodes[1].style = "border: 1px solid red"

        }else{
            var url = "/submitReviewMessage/"


            fetch(url, {

                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',        
                    'X-CSRFToken': csrftoken},
    
                body: JSON.stringify({'id': review_id, 'mssg': mssg})
            })
    
            .then((response) =>{
                return response.json()
            })
    
            .then((data) =>{

                console.log(data)
                mssgSubmitButton.parentNode.childNodes[1].value = ''
                let replay_message = JSON.parse(data.replay_message)

                

                let owner_section_response = document.querySelector('.owner-response-section') 


                owner_section_response.innerHTML += `<div class="reply_section">
                                                            <p>Property Owner Respond</p>
                                                            <small>${replay_message[0].fields.message}</small>
                                                    </div>`

            })
    
        }

    }
})







review_form.addEventListener('submit', (e) =>{
    
    e.preventDefault()

    console.log(header)

    console.log(header.value)

    header_value = header.value
    message_value = message.value

    console.log("header_value", header_value)

    if(header_value == '' && message_value == ''){
        console.log('empty')
        if(header_value == ''){
            header.style = "border: 1px solid red"
        }

        if(message_value == ''){
            message.style = "border: 1px solid red"
        }  
    }else{

        let url = "/postReview/"

        var data = new FormData()


        data.append('rating', rating_value)
        data.append('header', header_value)
        data.append('message', message_value)
        data.append('id', id)
    


        fetch(url, {
            method: 'POST',
            headers : {'X-CSRFToken': csrftoken},

            body: data
        })
        .then((response) =>{
            return response.json()
        })

        .then((data) =>{


            rating = JSON.parse(data.review)


            overlay.style = "display: none"
            reviewPostContainer.style = "display: none"
            document.querySelector('body').style = "overflow: scroll"
            document.querySelector('.empty-review-section').style = 'display: none'

            showReview(rating, review_section)

            totalStar = data['totalStar']
            totalReview = data['totalReview']

            displayAverageRating(totalStar, totalReview)

            displayAverageStar(totalStar, totalReview)
        
        })
    }

})




$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
    $("#success-alert").slideUp(500);
});



SliderImage = document.querySelector('.slider-image')

document.querySelector('.photos_video_label').addEventListener('click', (e)=>{
    const PhotoBtn = e.target.closest('.photos-number')
    const videoBtn =  e.target.closest('#play_video')

    if(PhotoBtn){
        console.log("hello")
        overlay.style = "display: block"
        document.querySelector('body').style = "overflow: hidden"
        SliderImage.style = "display: block"
        SliderImage.style.top = `${window.scrollY - 20}px`

    }  
    


    if(videoBtn){
        document.getElementById('video').play()
        document.getElementById('video').requestFullscreen();

    }

})



SliderImage.addEventListener('click', (e) =>{
    const closeMark = e.target.closest('.fa-solid')

    if(closeMark){
        console.log("hello")
        overlay.style = "display: none"
        document.querySelector('body').style = "overflow: scroll"
        SliderImage.style = "display: none"
    }
})



let secondColumn = document.querySelector('.second-column')



secondColumn.addEventListener('click', (e)=>{
    let mssgSubmitForm = e.target.closest('mssg-submit-form')


    if(mssgSubmitForm){
        e.preventDefault()

        let first_name = document.getElementById('first_name')
        let last_name = document.getElementById('last_name')
        let phone = document.getElementById('phone')
        let mssg_body = document.getElementById('mssg_body')
    
    
        if(first_name.value == '' || last_name.value == '' || phone.value == '' || mssg_body.value == ''){
            e.preventDefault()
    
            if(first_name.value == ''){
                first_name.style.border = "1px solid red"
    
            }else if(last_name.value == ''){
                last_name.style.border = "1px solid red"
    
            }else if(phone.value == ''){
                phone.style.border = "1px solid red"
                
            }else if(mssg_body.value == ''){
                mssg_body.style.border = "1px solid red"
            }
        }
    }
})

// let mssgSubmitForm = document.getElementById('mssg-submit-form')



// console.log('-------+++++++++++++++++++++++=====---', mssgSubmitForm)


// mssgSubmitForm.addEventListener('submit', (e)=>{
//     e.preventDefault()

//     let first_name = document.getElementById('first_name')
//     let last_name = document.getElementById('last_name')
//     let phone = document.getElementById('phone')
//     let mssg_body = document.getElementById('mssg_body')


//     if(first_name.value == '' || last_name.value == '' || phone.value == '' || mssg_body.value == ''){
//         e.preventDefault()

//         if(first_name.value == ''){
//             first_name.style.border = "1px solid red"

//         }else if(last_name.value == ''){
//             last_name.style.border = "1px solid red"

//         }else if(phone.value == ''){
//             phone.style.border = "1px solid red"
            
//         }else if(mssg_body.value == ''){
//             mssg_body.style.border = "1px solid red"
//         }
//     }

// })











