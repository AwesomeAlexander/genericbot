import { Discord, Client, Command, config, parseTokens, logger } from '../utils/exports';

/**
 * Function to be executed when the 'message' event is fired.
 */
export default function(client: Client, message: Discord.Message) {
	
	// Runs command if the message is triggering it.
	if (!!message.content && message.content.startsWith(config.prefix)) {
		let msg = message.content.substring(config.prefix.length);
		let tokenArgs = parseTokens(msg);

		for (let comm of client.commands) {
			if (comm.triggers.indexOf( tokenArgs[0] ) > -1) {
				comm.run(client, message, tokenArgs.slice(1)); // Run command.
				// logger(':command',`${comm.name} was run by ${message.author.tag} (${message.author.id}) by sending: "${message.content}"`);
				break; // (There should be no repeats)
			}
		}
	}

	// Log all messages
	// logger(':msg',`${message.guild ? message.guild.id : 'DM'}-${message.channel.id}-${message.id} [${message.author.tag} - ${message.author.id}]: ${message.content}${message.embeds.length > 0 ? '[EMBED]' : ''}${message.attachments.size > 0 ? '[IMAGE: '+message.attachments.first().proxyURL+']' : ''}`);
}