import * as Discord from 'discord.js';
import * as fs from "fs";
import * as path from 'path';

/**
 * Returns a formatted timestamp of the given date,
 * or current date if none is given.
 * @param {Date} date 
 * @returns {string} Formatted date.
 */
export function timestamp(date = new Date()): string {
	return date.toJSON().replace("T"," ").substring(0,19);
}

/**
 * Logs every message given.
 * If a message begins with ':',
 * every log after that will have the type/source
 * @param args All things to be logged
 */
export function logger(...args): void {
	let type: string; // The type / source given

	for (let i of args) { // Looping through all args
		if (typeof i === 'string' && i.charAt(0)===':') { // Set type
			// TODO: figure out why there is no <string>.startsWith
			type = i.substring(1).toUpperCase();
		} else { // Regular log
			console.log(`[${timestamp()}]${!!type ? ` ${type} | ` : ' '}${i}`);
			
			// Error Log as well
			if (i instanceof Error) console.error(i);
		}
	}
}

/**
 * Checks if a variable is a certain type
 * @param variable The variable to be checked
 * @param classType The class to be checked by
 */
export function isType(variable, classType/*: typeof Object*/): boolean {
	return variable instanceof classType/* && typeof variable === classType*/;
}

/**============================================================================================**/

// Export all other util classes & files

// Is there a better way to do this? using default?
export { Command } from './Command';
export { Client } from './Client';