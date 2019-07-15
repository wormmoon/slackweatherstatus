// Take long and lat and get current weather info
// Rerun every so often and get up to date weather info
const request = require('request');
const setStatus = require('./setStatus');

function getWeather(latLng) {
  // https://api.darksky.net/forecast/73670634fd8f73e49b11ba3497c4f12d/37.8267,-122.4233

  // console.log(`latlong: ${latLng}`);

  const lat = latLng.lat;
  const lng = latLng.lng;

  // console.log(`lat: ${lat}`);
  // console.log(`lng: ${lng}`);

  return new Promise(function(resolve, reject) {
    request(`https://api.darksky.net/forecast/73670634fd8f73e49b11ba3497c4f12d/${lat},${lng}`, { json: true }, (err, res, body) => {
      if (err) {
        // return console.log(err);
        reject(Error(err));
      } else {
        const weatherSummary = body.currently;
        resolve(weatherSummary);
      }
      // console.log('weather:', body);
      // const moonPhase = body.daily.data.moonPhase;

      // Convert to emoji

      // setStatus(weatherSummary, moonPhase);
      // return(weatherSummary);
    });
  })
}

module.exports = getWeather;
