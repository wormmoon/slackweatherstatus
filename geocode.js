require('dotenv').config();
const getWeather = require('./getWeather');
const request = require('request');

request('https://www.mapquestapi.com/geocoding/v1/address?key=ZQznL56SwOubzsr6rwsWArp1Mu0vF8A0&location=Brighton', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log('geocode:', body.results[0].locations[0].latLng);
  const latLng = body.results[0].locations[0].latLng;

  getWeather(latLng);
});

// console.log(body);
// console.log(lng);

// Get location from command and geocode in to long and lat
// const geoData = `http://www.mapquestapi.com/geocoding/v1/address?key=ZQznL56SwOubzsr6rwsWArp1Mu0vF8A0&location=Brighton`;

// module.exports = lat, lng;

