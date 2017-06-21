const Discord = require('discord.js');
const promiseWhile = require("promise-while");
var config = require('./config.js')
var MarkovChain = require('markovchain')
var client = new Discord.Client();

var userMsgs = [];


client.on('ready', () => {
	console.log('I am ready!');
	client.guilds.first().channels.array().forEach(chan => {
		if(chan.type == "text"){
			var size = 100;
			console.log("Conencted to channel: " + chan.name);
			promiseWhile(size >= 50,chan.fetchMessages({limit: size})
                                .then(messages => {
                                        console.log(messages.size + " messages fetched");
                                        messages.array().forEach( message => {
                                                var arr = message.content.split(" ");
                                                console.log(message.author.toString() + ": " + message.content);
                                                arr.forEach(obj=>userMsgs.push(obj));
                                                //console.log(author + "'s array: " + userMsgs[author]);
                                                size = messages.size;
                                        });
                                })
                                .catch(console.error));
		}
	});
});
var useUpperCase = function(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z'
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

client.on('message', message => {
 	var arr = message.content.split(" ");
	console.log(message.author.toString() + ": " + message.content);
        var author = message.author.toString();
	arr.forEach(obj=>userMsgs.push(obj));
	if(message.mentions.users.first() == client.user){
			console.log("Sending shitpost"); 
			var qoutes = new MarkovChain(userMsgs.join(" "));
			message.channel.send((qoutes.start(useUpperCase).end(10).process()));
	}
});

client.login(api_key);
