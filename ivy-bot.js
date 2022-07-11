const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const request = require('request');

// initialise bot
const client = new Discord.Client({
	token: auth.discord.auth_token,
	autorun: true
});

// configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

class IvyBot {
	initialize() {
		const photoLinks = ['ivy.jpg','ivy2.jpg','ivy3.jpg'];
		client.on('ready', function (evt) {
			logger.info('Connected');
			logger.info('Logged in as: ');
			logger.info(client.username + ' - (' + client.id + ')');
		});
		client.on('message', function(user, userID, channelID, message, evt) {
			if (message.substring(0, 1) == '!') {
				let args = message.substring(1).split(' ');
				let cmd = args[0];
				args = args.splice(1);
				switch(cmd) {
					case 'ivy':
					let random = photoLinks[Math.floor(Math.random() * photoLinks.length)];
						client.sendMessage({
							to: channelID,
							message: 'Random Ivy photo incoming...'
						});
						client.uploadFile({
							to: channelID,
							file: random
						});
						break;
				}
			}
		});
	}
}

function start() {
	let bot = new IvyBot();
	bot.initialize();
}

start();