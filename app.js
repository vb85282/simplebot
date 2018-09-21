"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const builder = require("botbuilder");
require('dotenv').config();
const restify = require('restify');

//define the Bot Services bot connector
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//define bot storage
//uses in memory storage
var inMemoryStorage = new builder.MemoryBotStorage();

/* -------------METHOD 1----------------*/
//initialize a new bot 
//set Connector to Bot Services as first argument
//set the default dialog as second argument.
//note: the second argument can exist without an array
var bot = new builder.UniversalBot(connector , function(session){
    session.send('ECHO ' + session.message.text);
});
bot.set('storage', inMemoryStorage);
//https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-dialog-overview?view=azure-bot-service-3.0
/* -------------End METHOD 1-------------*/

//server setup
var server = restify.createServer();
server.listen(process.env.PORT, function(){
    console.log('server up and running on port ', process.env.PORT);
});
server.post('/api/messages', connector.listen());

/* -------------METHOD 2----------------*/
/* 
//initialize a new bot
//set Connector to Bot Services as first argument
//no default dialog, leave second argument blank.
//set default dialog using bot dialog instead 
var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);
bot.dialog('/',[function(session){
    session.send('ECHO ' + session.message.text);
}]);*/
//https://docs.microsoft.com/en-us/azure/bot-service/nodejs/bot-builder-nodejs-dialog-overview?view=azure-bot-service-3.0#default-dialog
/* -------------End METHOD 2-------------*/



