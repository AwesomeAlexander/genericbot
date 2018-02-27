const Discord = require('discord.js');

module.exports = (client, message) => {
	if (message.author.id === client.user.id) return; // Doesn't reply to it's own messages
	if (message.author.bot) return; // Doesn't respond to bots


	// Command Handler
	if (message.content.startsWith(client.prefix))
	let command = message.content.split(" ")[0].substr(client.prefix.length);
	client.commands.forEach((cmd,name,commands) => {
		if (client.commands === command && 
			client.comparePerms(
				client.evaluatePerms(message.member || message.author),
				cmd.consts.permsNeeded,
				true /* By default allows superusers to execute all commands*/
			)
		) {
			cmd.run(message,message.content.substr(command.length+client.prefix.length));
		}
	})
	// TODO: Check Command Aliases
};