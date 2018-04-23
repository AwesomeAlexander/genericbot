const Discord = require('discord.js');
const config = require ("../config.json")

module.exports = (client, message) => {
	if (message.author.id === client.user.id) return; // Doesn't reply to it's own messages
	if (message.author.bot) return; // Doesn't respond to bots


	// Command Handler
	if (message.content.startsWith(client.prefix))
	let command = message.content.split(" ")[0].substr(config.prefix.length);
	client.commands.forEach((cmd,name,commands) => {
		if ((name === command || cmd.consts.aliases.includes(command)) && 
			client.comparePerms(
				client.evaluatePerms(message.member || message.author, (!!message.guild ? message.channel : null)),
				cmd.consts.permsNeeded,
				true /* By default allows superusers to execute all commands*/
			)
		) {
			cmd.run(client, message, message.content.substr(command.length+config.prefix.length));
		}
	});
};
