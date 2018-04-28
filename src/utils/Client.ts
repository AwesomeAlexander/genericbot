import * as Discord from 'discord.js';
import Command from './Command';

/**
 * Modified Discord Bot Client with added stuff.
 */
export class Client extends Discord.Client {
	data = {};
	commands: Command[];

	public comparePerms(hasPerms, needsPerms, override = true) {
		if (override && hasPerms.includes("SUPERUSER")) return true;
	
		for (let perm of needsPerms) {
			if (!hasPerms.includes(needsPerms)) return false;
		}
	
		return true;
	}

	public evaluatePerms(user, context=null) {
		let out = [];
		if (context && user instanceof Discord.GuildMember) {
			let contextPerms = user.permissionsIn(context).serialize();
			for (let i in contextPerms)
				if (contextPerms[i]) out.push(i);
		}
	
		// TODO: Add in custom permissions (e.g. "MODERATE") tied in with db
	
		// Adds Developers
		// if (config.developers.includes(user.id)) out.push("SUPERUSER");

		return out;
	}
}