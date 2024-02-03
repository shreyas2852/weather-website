const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFyZGlrMjIxIiwiYSI6ImNsaWR2Z2R4eDB2cHUzZ3BtaDN6cHFwN3IifQ.fsf7KX6d-IEHkvnzl1G7AQ&limit=1'
    request({url, json: true}, (error, {body}) => { // object destructuring : response -> {body}
        if(error){
            callback('unable to find location', undefined)
        } else if(body.features.length === 0) {
            callback('Location doesn\'t exist', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode