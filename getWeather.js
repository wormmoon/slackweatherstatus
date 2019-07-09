// Take long and lat and get current weather info
// Rerun every so often and get up to date weather info
const request = require('request');
const setStatus = require('./setStatus');

function getWeather(latLng) {
  // https://api.darksky.net/forecast/73670634fd8f73e49b11ba3497c4f12d/37.8267,-122.4233

  console.log(latLng);

  const lat = latLng.lat;
  const lng = latLng.lng;

  console.log(lat);
  console.log(lng);

  request(`https://api.darksky.net/forecast/73670634fd8f73e49b11ba3497c4f12d/${lat},${lng}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    // console.log('weather:', body);

    const currentSummary = body.currently.summary;
    console.log(currentSummary);

    const weatherSummary = body.currently.summary;
    const moonPhase = body.daily.data.moonPhase;

    // Convert to emoji

    setStatus(weatherSummary, moonPhase);
  });
}

module.exports = getWeather;