import { Discord, Client, Command, config, parseTokens } from '../utils/exports';

/**
 * Function to be executed when the 'message' event is fired.
 */
export default function(client: Client, message: Discord.Message) {
	
	// Runs command if the message is triggering it.
	if (message.content.startsWith(config.prefix)) {
		let msg = message.content.substring(config.prefix.length);
		let tokenArgs = parseTokens(msg);

		for (let comm of client.commands) {
			if (comm.triggers.indexOf( tokenArgs[0] ) > -1) {
				comm.run(client, message, tokenArgs.slice(1)); // Run command.
				break; // (There should be no repeats)
			}
		}
	}
}