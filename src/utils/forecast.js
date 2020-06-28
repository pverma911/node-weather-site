
const request = require("request");





const forecast = (lati, longi, callback) =>{
    const url ="http://api.weatherstack.com/current?access_key=9a5be74b6c9e0cf2b057bea35239ef6e&query=" +encodeURIComponent(lati) + ',' + encodeURIComponent(longi);

    request({url: url, json: true},
        (error, {body}) =>{
            if(error){
                callback("Network Error");
            }
            else if(body.error){
                callback("Enter a valid location only");
            }
            else{
                callback(undefined, "You are currently viewing weather data for: " + body.location.name + ". It is currently " + body.current.temperature + " degree C" + ". Their is " + body.current.precip + " % Chance of rain")
            }
        })

}

module.exports= forecast; 