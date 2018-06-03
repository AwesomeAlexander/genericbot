import * as Discord from 'discord.js';
import { parseTokens, generatePermissions, evaluatePermissions, parseCommandOptions } from './Functions';
import config from './Config';
import { Client } from './exports';

/**
 * A type of function that could be called when a Command is invoked
 */
export type Runnable = (client: Client, message: Discord.Message, args: string[], options?: string[]) => void;

/**
 * Command class to be instantiazed for commands to be called by users using the bot
 */
export class Command {
	triggers: string[]; // Things that invoke the command
	usageExamples: string[];
	permissionsNeeded: string[];
	override: boolean;
	private onRun: Runnable;

	/**
	 * Creates a new Command object
	 * @param name The name of the command
	 * @param description Description of the command
	 * @param onRun Function called when running the command
	 * @param permissionsNeededToRun Optional: Any permissions you need to run the Command
	 * @param aliases Optional: Aliases to reference the command by when calling
	 * @param usageExamples Optional: Usage examples
	 * @param override Whether the command's permissions can be overriden by developers. Defaults to value provided by config.yaml, which is client-wide. Do not change unless necessary for specific command.
	 */
	constructor(
		public name: string,
		public description: string,
		onRun: Runnable,
		permissionsNeededToRun?: (string | Discord.Permissions | Discord.PermissionObject)[],
		aliases?: string[],
		usageExamples?: string | string[],
		override = config.override) {

		this.triggers = [name].concat(aliases || []);

		this.usageExamples = ((typeof usageExamples === "string") ? [usageExamples] : usageExamples);

		this.onRun = onRun;

		this.override = override;

		this.permissionsNeeded = generatePermissions(permissionsNeededToRun);
	}

	/**
	 * Wrapper for running the command if provided permissions satisfy
	 * @param client The Client (bot) object
	 * @param message The Message object provided by discord.js detailing message data & metadata
	 * @param args Arguments given when command is called
	 */
	public run(client: Client, message: Discord.Message, args: string | string[]) {
		if (typeof args === "string") args = parseTokens(args);

		let options = parseCommandOptions(args);

		// Test for help option
		if (['h','help'].some(opt=>options.indexOf(opt) > -1)) {
			message.channel.send(this.sendHelp());
		}

		if (this.permissionsSatisfy(evaluatePermissions(message.author, message.channel))) {
			this.onRun(client, message, args, options);
		}
	}

	/**
	 * Returns whether the permissions given satisfy this command's permissions,
	 * and subsequently whether the command can be run by a user with those permissions.
	 * @param perms Permissions to be compared.
	 * @param override Whether to factor in superuser overrides.
	 */
	public permissionsSatisfy(perms: string[], override: boolean = this.override): boolean {
		if (override && perms.indexOf("SUPERUSER") > -1) return true;

		for (let p of this.permissionsNeeded) {
			if (p.startsWith("USER-") && perms.indexOf(p.substring(5)) > -1) return true; // OR - Quick out if hardcoded User
			if (!(perms.indexOf(p) > -1)) return false; // AND - All must be true
		}

		return true;
	}

	/**
	 * Gives a help command
	 */
	public sendHelp() {
		let out = new Discord.RichEmbed()
			.setTitle("Command Help: "+this.name)
			.setDescription(this.description)
			//.addBlankField()
			.setTimestamp();
		let val = "";

		// Aliases
		val = "";
		if (!!this.triggers && this.triggers.length > 1)
			val += (this.triggers.join('`, `')+'`').substring(this.name.length+3);
		else val += "NONE";
		out.addField("Aliases", val);

		// Usage examples
		if (!!this.usageExamples && this.usageExamples.length > 1)
			out.addField('How To Use','`'+this.usageExamples.join('`\n`')+'`');

		// Permissions needed
		val = "";
		if (!!this.permissionsNeeded && this.permissionsNeeded.length > 1)
			val += this.permissionsNeeded.join('\n');
		else val += "NONE";
		out.addField("Permissions Needed to Run", val);


		return out;
	}


}

/**
 * TODO
 */
export class CommandHandler {
	// TODO: RECONSIDER DESIGN
	// Event based? would make easier for function runs - client.on('command')?
	// could then do Discord 'fire' command...?
	// crawler - can recurse it's own commandhandlers for each dir for modules

	constructor(public client: Client, public name) {

	}
}