// Imports
import * as Discord from 'discord.js';
import { Client, Command, logger } from './utils/exports';
import * as fs from 'fs';
import * as path from 'path';


// The Client ("bot") to be made
const client = new Client();

// TODO: crawl through command files and event files. set up Message.ts event file 
// WAIT - IDEA - CRAWLER FOR COMMAND STRUCTURE WITH SUBCOMMANDS AND OPTIONS AND STUFF

fs.readdir(path.join(__dirname,'commands'),"utf8", (err,files) => {
	if (err) logger(":ERROR",err);

	files.forEach(file => {
		import(file).then(ret=>client.commands.push(ret)).catch(console.error);
	});
});

export default client;