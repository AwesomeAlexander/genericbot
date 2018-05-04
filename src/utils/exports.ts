import * as Discord from 'discord.js';
// import * as fs from "fs";
// import * as path from 'path';
import { Command } from './Commands';

/**
 * Modified Discord Bot Client with added stuff.
 */
export class Client extends Discord.Client {
	public tmpData = {};
	commands: Command[];
}

/*============================================================================================*/

// Other files' exports

export * from './Functions';
export * from './Commands';