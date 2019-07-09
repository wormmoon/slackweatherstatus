require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Creates express app
const app = express();
// The port used for Express server
const PORT = 3000;
// Starts server
app.listen(process.env.PORT || PORT, function() {
  console.log('Bot is listening on port ' + PORT);
});

// const text = 
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
          res.json( );
        });
  });