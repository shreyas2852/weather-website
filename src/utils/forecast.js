const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9a04a4c0aeb5b8f426396abbdb4783cf&query='+latitude+','+longitude+'&units=m'
    request({url, json: true}, (error, {body}) => { // object destructuring : response -> {body}
        if(error) {
            callback('unable to find location', undefined);
        } else if(body.error){
            callback('Location does not exist for given latitude and longitude', undefined);
        } else{
            callback(undefined, `${body.current.weather_descriptions[0]}: It is currently ${body.current.temperature} degrees outside but it feels like ${body.current.feelslike}. There is a ${body.current.precip}% chance of rain. The humidity is ${body.current.humidity}.`)
        }
    })
}

module.exports = forecast