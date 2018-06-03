import { Command, Client, Discord, config, evaluatePermissions, parseCommandOptions } from '../utils/exports';

/**
 * What the command should do when called.
 * @param client The Client (Bot) object.
 * @param message The message object provided by discord.js giving information about the message.
 * @param args Token arguments of the message content, after the prefix and command call.
 */
function whenCalled(client: Client, message: Discord.Message, args: string[], options: string[]) {

	var out: string = "**Commands** (accessible to you):\n";
	for (let command of client.commands)
		if (command.permissionsSatisfy(evaluatePermissions(message.author, message.channel)))
			out += `\`${config.prefix}${command.name}\` • ${command.description}\n`;
	out += "(For further information on a command, do `{p}command -h` or `{p}command --help`)"

	message.channel.send(
		new Discord.RichEmbed()
			.setTitle("Help")
			.setDescription(out)
			.setFooter(`Requested by ${message.author.tag} (${message.author.id})`,message.author.avatarURL)
			.setTimestamp()
		);
}

export default new Command(
	"help", // The name of the command, and how it is called by users.
	"Help command. Gives this message.", // Description of what the command does, used in command help.
	whenCalled, // Function (defined above) that runs when the command is run.
	[], // Permissions needed to run the command.
	['halp','helpme','h'], // Any additional aliases the user can call the command by.
	[] // Usage examples - used in 'help' description.
);