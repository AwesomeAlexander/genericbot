// Imports
import * as Discord from 'discord.js';
import { Client, Command, logger } from './utils/exports';
import * as fs from 'fs';
import * as path from 'path';


// The Client ("bot") to be made
const client = new Client();


// Commands
fs.readdir(path.join(__dirname,'commands'),"utf8", (err,files) => {
	if (err) logger(":ERROR",err);

	files.forEach(file => {
		import( path.join(__dirname,'commands',file) ).then(ret=>{
			client.commands.push(ret['default']);
		}).catch(console.error);
	});
});

// Events
fs.readdir(path.join(__dirname,'events'),"utf8", (err,files) => {
	if (err) logger(":ERROR",err);

	files.forEach(file => {
		let name = file.split(".")[0];
		import( path.join(__dirname,'events',file) ).then(ret=>{
			client.on(name, (...args) => ret['default'](client, ...args));
		}).catch(console.error);
	});
});

export default client;