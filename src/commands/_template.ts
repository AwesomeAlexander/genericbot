import { Command, Client, Discord } from '../utils/exports';

/**
 * What the command should do when called.
 * @param client The Client (Bot) object.
 * @param message The message object provided by discord.js giving information about the message.
 * @param args Token arguments of the message content, after the prefix and command call.
 */
function whenCalled(client: Client, message: Discord.Message, args: string[]) {
	
}

export default new Command(
	"NAME", // The name of the command, and how it is called by users.
	"DESCRIPTION", // Description of what the command does, used in command help.
	whenCalled, // Function (defined above) that runs when the command is run .
	[], // Permissions needed to run the command.
	[], // Any additional aliases the user can call the command by.
	[] // Usage examples - used in 'help' description.
);