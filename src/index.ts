// Imports
import * as Discord from 'discord.js';
import { Client, Command, logger } from './utils/exports';
// import * as config from './config.json'; // TODO: import config

// The Client ("bot") to be made
const client = new Client();


// Event Handler
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err); // Error Out if there's an Error

	files.forEach(file => { // Loop through files in folder
		let evt = require(`./events/${file}`), // Event file
			name = file.split(".")[0]; // Get rid of '.js'
		if (name.startsWith("__")) return; // Return if template
		
		// Sets event listener of 'name' to the function '.run' found by the file.
		client.on(name, (...args) => evt.run(client, ...args));
	});
});

// Command Handler
fs.readdir("./commands/", (err,files) => {
	if (err) return console.error(err); // Error Out if there's an Error

	files.forEach(file => { // Loop through files in folder
		let cmd = require(`./commands/${file}`), // Event file
			name = file.split(".")[0]; // Get rid of '.js'
		if (name.startsWith("__")) return; // Return if template

		// Adds all commands to the commands list,
		// which will be handled by the events/message.js file
		// when a message event is triggered
		client.commands.set(name,cmd);
	})
});

client.login(config.token);
