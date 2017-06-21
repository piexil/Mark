const Discord = require('discord.js');
const promiseWhile = require("promise-while");
var config = require('./config.js')
var EpicHAL = require('epichal');
var client = new Discord.Client();

var userMsgs = [];
var epichal = EpicHAL();

client.on('ready', () => {
	console.log('I am ready!');
	client.guilds.first().channels.array().forEach(chan => {
		if(chan.type == "text"){
			console.log("Conencted to channel: " + chan.name);
			getMsgs(chan);      
                                
		}
	});
});
async function getMsgs(chan){
                                console.log("Entering ASYNC");
                                var size = 100;
                                var epoch = 0;
                                try{
                                while(size == 100){
                                        const messages = await chan.fetchMessages({limit: size,before: epoch})
                                        console.log(messages.size + " messages fetched");
                                        messages.forEach( message => {
                                                if(message.author.bot == false){
                                                        var arr = message.content.split(" ");
                                                        console.log(message.id.toString() + " : " + message.author.toString() +
                                                                ": " + message.content);
                                                        epichal.learn(message.cleanContent);
                                                        //console.log(author + "'s array: " + userMsgs[author]);
                                                        size = messages.size;
                                                        epoch = message.id;
                                                }
                                        });
                                }
                                }catch(e){
                                        console.error(e);
                                }
                         }

client.on('message', message => {
 	if(message.author.bot == false){
	var arr = message.content.split(" ");
	console.log(message.author.toString() + ": " + message.content);
        var author = message.author.toString();
	if(message.mentions.users.first() == client.user||message.channel.type === 'dm'){
			console.log("Sending shitpost");
			epichal.reply(message.cleanContent.substr(message.cleanContent.indexOf(" " + 1)),(err, reply) =>{ 
				message.channel.send(reply);
				epichal.learn(message.cleanContent);
			});
	}
	}
});

client.login(api_key);
