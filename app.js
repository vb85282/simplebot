"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const builder = require("botbuilder");
require('dotenv').config();
const restify = require('restify');

//define the bot connector
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//server setup
var server = restify.createServer();
server.listen(process.env.PORT, function(){
    console.log('server up and running on port ', process.env.PORT);
});
server.post('/api/messages', connector.listen());

//bot setup 
var inMemoryStorage = new builder.MemoryBotStorage();
var bot = new builder.UniversalBot(connector , [function(session){
    session.send('ECHO ' + session.message.text);
}]);
bot.set('storage', inMemoryStorage);



