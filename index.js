require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const geocode = require('./geocode');
const getWeather = require('./getWeather');
const request = require('request');

// Creates express app
const app = express();
// The port used for Express server
const PORT = 8000;
// Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  // Not sure if this is const or let as I'm not sure when this function runs
  // I assume it runs every time someone does slack command and therefore have
  // put const
  // Get location as argument from slack command
  const location = req.body.text;

  let emojiUp, summary;
  // Try/catch - will log any errors occurring
  try {
    // Everything had to go in this try/catch otherwise it didn't run
    const latlong = await geocode(location);
    console.log(latlong);
    const weatherStatus = await getWeather(latlong);
    const emoji = await convertWeatherToEmoji(weatherStatus.icon);
    // console.log(`weather status: ${weatherStatus}`);
    // console.log(`emoji: ${emoji}`);
    emojiUp = emoji;
    summary = weatherStatus.summary;

    const data = {
      profile: JSON.stringify({
          status_text: summary,
          status_emoji: emojiUp,
          status_expiration: 0
      })
    };

    // console.log(data);

    request.post(
      {
        url: 'https://slack.com/api/users.profile.set',
        auth: {
          'bearer': process.env.SLACK_AUTH_TOKEN
        },
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        formData: data,
        json: true
      },

      function (error, response, body) {
        // console.log(body)
        res.json()
      }
    );
  } catch(error) {
    console.error(error);
  }
});

const convertWeatherToEmoji = (weatherStatus) => {
  // I don't know if this needs to be a promise?
  // I put it as an 'await' because it needs to wait to run after we've had a response from the previous function
  // But there is no request here
  return new Promise(function(resolve, reject) {
    let emoji;
    // Convert weather status to emoji
    switch (weatherStatus) {
      case 'clear-day':
        emoji = ':sunny:';
        break;

      case 'clear-night':
        emoji = ':full_moon_with_face:';
        break;

      case 'rain':
        emoji = ':rain_cloud:';
        break;

      case 'snow':
        emoji = ':snow_cloud:';
        break;

      case 'sleet':
        emoji = ':snow_cloud:';
        break;

      case 'wind':
        emoji = ':wind_blowing_face:';
        break;

      case 'fog':
        emoji = ':fog:';
        break;

      case 'cloudy':
        emoji = ':cloud:';
        break;

      case 'partly-cloudy-day':
        emoji = ':partly_sunny:';
        break;

      case 'partly-cloudy-night':
        emoji = ':full_moon_with_face:';
        break;

        default:
          emoji = ':partly_sunny:';
      }

    if (emoji != undefined) {
      // console.log(`emoji from in function: ${emoji}`);
      resolve(emoji);
    } else {
      // return console.log(err);
      reject(Error(err));
    }
  })
};
