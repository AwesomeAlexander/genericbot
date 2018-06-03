import * as Discord from 'discord.js';
import { Command } from './Commands';
import config from './Config';

/**
 * Modified Discord Bot Client with added stuff.
 */
export class Client extends Discord.Client {
	public tmpData = {};
	commands: Command[] = [];
	webhooks: Discord.Webhook[] = [];
}

/*============================================================================================*/

export { Discord, config };

// Other files' exports

export * from './Functions';
export * from './Commands';