// Take long and lat and get current weather info
// Rerun every so often and get up to date weather info
const request = require('request');
const bodyParser = require('body-parser');

function setStatus(weatherSummary, moonPhase) {
  const text = 
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.post('/', (req, res) => {
    var data = {profile: {
      "status_text": "",
      "status_emoji": ":sun:",
      "status_expiration": 0
    }};
    request.post('https://slack.com/api/users.profile.set', data, function (error, response, body) {
          // Sends welcome message
          res.json(data);
        });
  });
}

module.exports = setStatus;