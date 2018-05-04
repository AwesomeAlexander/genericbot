import * as Discord from 'discord.js';
import { parseTokens, yieldPermissions, evaluatePermissions } from './Functions';
import { Client } from './exports';

/**
 * A type of function that could be called when a Command is invoked
 */
export type Runnable = (client: Client, message: Discord.Message, args: string[]) => void;

/**
 * Command class representing a class
 * new Command("somecommand","this is a command",function() {},[READ_MESSAGES],["someothercommand","fewhiowefh"],);
 */
export class Command {
	triggers: string[]; // Things that invoke the command
	usageExamples: string[];
	private onRun: Runnable;
	private permissionsNeeded: string[];

	/**
	 * Creates a new Command object
	 * @param name The name of the command
	 * @param description Description of the command
	 * @param onRun Function called when running the command
	 * @param permissionsNeededToRun Optional: Any permissions you need to run the Command
	 * @param aliases Optional: Aliases to reference the command by when calling
	 * @param usageExamples Optional: Usage examples
	 */
	constructor(public name: string,public description: string,onRun: Runnable,permissionsNeededToRun?: (string | Discord.Permissions | Discord.PermissionObject)[],aliases?: string[],usageExamples?: string | string[]) {
		
		this.triggers = (!!aliases ? [].concat([name],aliases) : [name]);

		this.usageExamples = ((typeof usageExamples === "string") ? [usageExamples] : usageExamples);

		this.onRun = onRun;

		this.permissionsNeeded = yieldPermissions(permissionsNeededToRun);
	}

	/**
	 * TODO
	 * @param client 
	 * @param message 
	 * @param args 
	 */
	public run(client: Client, message: Discord.Message, args: string | string[]) {
		if (typeof args === "string") args = parseTokens(args);

		if (this.permissionsSatisfy(evaluatePermissions(message.author,message.channel))) {
			this.onRun(client,message,args);
		}
	}

	/**
	 * TODO
	 * @param perms 
	 * @param override 
	 */
	public permissionsSatisfy(perms: string[], override = true) {
		if (override && perms.indexOf("SUPERUSER") > -1) return true;
	
		for (let p of this.permissionsNeeded) if (!(perms.indexOf(p) > -1)) return false;
	
		return true;
	}
}

/**
 * Command with a parent command
 */
export class SubCommand extends Command {
	parent: Command; // TODO: consider modules?
}

/**
 * TODO
 */
export class CommandHandler {
	// TODO: use lambdas, token parser, etc.
	// Event based? would make easier for function runs - client.on('command')?
	// could then do Discord 'fire' command...?
	// crawler - can recurse it's own commandhandlers for each dir for modules

	constructor(public client: Client, public name) {

	}
}