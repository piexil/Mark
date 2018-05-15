const Discord = require('discord.js');
const promiseWhile = require("promise-while");
var config = require('./config.js')
jsmegahal = require('jsmegahal');
var client = new Discord.Client();
var data = []
var userMsgs = [];
var megahal = new jsmegahal(4);

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
                                                        megahal.add(message.cleanContent.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
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
	if(message.mentions.users.first() == client.user||message.channel.type === 'dm' || message.content.toUpperCase().indexOf('MARK') > -1 || Math.floor(Math.random() * Math.floor(100)) > 98 ){
			console.log("Sending shitpost");
			megahal.add(message.cleanContent); 
				
				message.channel.send(megahal.getReplyFromSentence(message.cleanContent.replace(/mark/ig,"")));
				
	
	}	
	}
});

client.login(config.api_key);
