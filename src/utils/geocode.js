// GeoLocation using CallBack:
// Trying to make highly reusable functions.

const request = require('request');

// response got destructured to body

const geocode = (address, callback) =>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicHZlcm1hNjg5IiwiYSI6ImNrYnAyaDQ2YzFldDkyd3I1aWowZWRrc2YifQ.WfoqXtFuvnurwQgjzG8MeQ&limit=1";

    request({url: url, json:true}, (error,{body})=>{

        if(error){
            callback("Can't connect right now....");
        }
        else if(body.features[0] == null){
            callback("No such Location found");
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }) 
            
        }
    })

}

module.exports = geocode;