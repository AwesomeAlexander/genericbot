// Declaring Constants
const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

// The Client ("bot") to be made
const client = new Discord.Client();

// All commands will be put in here
// Will map names of commands to 
client.commands = new Discord.Collection();

// 'Global' Data to be used accross commands and events
client.data = {
	devs: config.developers,
	prefix: config.prefix,
	temp: {}
};

// Permissions Handler/s
client.comparePerms = function(hasPerms, needsPemrs, override = true) {
	if (override && hasPerms.includes("SUPERUSER")) return true;

	for (let perm of needsPerms) {
		if (!hasPerms.includes(needsPemrs)) return false;
	}

	return true;
}
client.evaluatePerms = function(user, context=null) {
	let out = [];
	if (context && typeof user === Discord.GuildMember) {
		let contextPerms = user.permissionsIn(context).serialize();
		for (let i in contextPerms)
			if (contextPerms[i]) out.push(i);
	}

	// TODO: Add in custom permissions (e.g. "MODERATE") tied in with db

	// Adds Developers
	if (client.data.devs.includes(user.id)) out.push("SUPERUSER");

	return out;
}

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