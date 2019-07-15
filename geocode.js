require('dotenv').config();
const getWeather = require('./getWeather');
const request = require('request');

const geocode = function(place) {

  return new Promise(function(resolve, reject) {
    request(`https://www.mapquestapi.com/geocoding/v1/address?key=ZQznL56SwOubzsr6rwsWArp1Mu0vF8A0&location=${place}`, { json: true }, (err, res, body) => {
      if (err) {
        // return console.log(err);
        reject(Error(err));
      } else {
        // console.log('geocode:', body.results[0].locations[0].latLng);
        const latLng = body.results[0].locations[0].latLng;

        // getWeather(latLng);
        resolve(latLng);
      }
    });
  })
}

module.exports = geocode;
