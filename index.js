'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var router = express.Router();
var http = require('http').Server(app);


require('dotenv').config()

// You need it to get the body attribute in the request object.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


var botkit = require('botkit');

var facebookController = botkit.facebookbot({
  verify_token: process.env.FB_VERIFY_TOKEN,
  access_token: process.env.FB_ACCESS_TOKEN
});

var facebookBot = facebookController.spawn({});

facebookController.setupWebserver("8080",function(err,webserver) {
  facebookController.createWebhookEndpoints(facebookController.webserver, facebookBot, function() {
      console.log('Your facebook bot is connected.');
  });
});

facebookController.hears(['.*'], 'message_received', function(bot, message){
  facebookBot.reply(message, 'You wrote -  '+message.text);
});
