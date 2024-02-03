// Client-side JS

const weatherForm = document.querySelector('form')
const searchData = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchData.value
    
    messageOne.textContent='Loading...'
    messagetwo.textContent=''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        } else{
            messageOne.textContent = data.forecast
            messagetwo.textContent = data.location
        }
        
    })
    
})
})