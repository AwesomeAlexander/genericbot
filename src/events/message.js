const Discord = require('discord.js');

module.exports = (client, message) => {
	if (message.author.id === client.user.id) return; // Doesn't reply to it's own messages

	for (let cmd of client.commands) {
		if (client.comparePerms(
			client.evaluatePerms(message.member || message.author),
			cmd.consts.permsNeeded,
			true /* By default allows superusers to execute all commands*/)) {
			cmd.run(message);
		}
	}
};