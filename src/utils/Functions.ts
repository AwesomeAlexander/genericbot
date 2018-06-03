/* [Development]
This file will contain utility functions only.
None of the functions are state-modifying.
*/

import * as Discord from "discord.js";
import * as fs from 'fs';
import * as path from 'path';

import config from './Config';

/**
 * Returns a formatted timestamp of the given date,
 * or current date if none is given.
 * @param date Timestamp you'd like to convert
 * @returns Formatted date.
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
		if (typeof i === 'string' && i.startsWith(':')) { // Set type
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
	// TODO: make useful
}

/**
 * Recursively crawls through a Directory, hitting all files and applying some function to it.
 * @param parentDir Parent Directory to start recursing from
 * @param doThis Function to apply when reading a file
 * @param args Any extra arguments you want to pass into doThis
 */
export function crawlDir(parentDir: string, doThis: (parentDir: string,file: string,...args: any[]) => void,...args: any[]): void {
	let files = fs.readdirSync(parentDir,"utf8");
	for (let i of files) {
		if (fs.lstatSync(i).isDirectory())
			crawlDir(i,doThis,args);
		else
			doThis(parentDir,i,args);
	}
}

/*============================================================================================*/

/**
 * Evaluates the permissions a certain User by the bot (both Native Discord Permissions & Bot Permissions)
 * @param user User whose permissions will be tested
 * @param context Optional Context field of the Channel. If not provided, Discord Permissions will not be added.
 */
export function evaluatePermissions(user: Discord.User, context?: Discord.Channel): string[] {
	let out: string[];

	if (context && user instanceof Discord.GuildMember) {
		out.concat(generatePermissions([user.permissionsIn(context)]));
	}

	// TODO: Add in custom permissions (e.g. "MODERATE") tied in with db

	// Adds Developers
	if (config.developers.includes(user.id)) out.push("SUPERUSER");
	// TODO: fix in typescript

	return out;
}

/**
 * Generates an string array representing Discord Permissions + Bot Permissions
 * @param permissions Permissions object to read
 */
export function generatePermissions(permissions: (string | Discord.Permissions | Discord.PermissionObject)[]): string[] {
	let out: string[];

	for (let i of permissions) {
		if (typeof i === "string") {
			out.push(i);
		} else { // Discord Permissions
			let perms = (i instanceof Discord.Permissions ? (<Discord.Permissions>i).serialize() : i);
			for (let j in perms) if (j && perms[j]) out.push(j);
		}
	}

	return out;
}

/*============================================================================================*/

// Constants
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "1234567890";

/**
 * Parses a string into 'tokens'
 * Numbers and Letters are grouped together, whereas other characters are separate tokens
 * @param str String input
 * @returns Array of 'tokens'
 */
export function parseTokens(str: string): string[] {
	var out: string[];
	
	str += "~"; // Ending character to help collect last word
	for (var head=0,tail=head;head<str.length;) {
		if (alphabet.indexOf(str[head]) + alphabet.toLowerCase().indexOf(str[head]) + digits.indexOf(str[head]) > -3) {
			// Character is a letter in the alphabet (or a number)
			head++;
		} else {
			// Hit a Non-letter character
			 // Add word, then single character token it hit
			out.push(str.substring(tail,head),str[head]);

			tail = ++head; // Moves on
		}
	}

	out.pop(); // removing last "~" char
	return out;
}

/**
 * Parses command options like -v, -r, --do-some-option, etc
 * @param str String input
 * @returns Dictionary of string: boolean items
 */
export function parseCommandOptions(str: string | string[]): {[opt: string]: boolean;} {
	// TODO: Parse options for commands
	
	return null;
}

/**
 * Parses a string into different words, separated by whitespace
 * @param str String input
 * @returns Array of words
 */
export function parseWords(str: string): string[] {
	return str.split(/[^ \n\t]/);
}