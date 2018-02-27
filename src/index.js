// Initial File

// Global Functions, Declared before anything
Date.prototype.timestamp = function() {
	return `[${this.toJSON().slice(0,10).replace(/-/g,'/')} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}]`;
};
global.logger = async () => {
	for (let i in arguments) {
		if (arguments[i].toString().toLowerCase().startsWith("ERROR"))
			console.error(new Date().timestamp()+" "+arguments[i]);
		else
			console.log(new Date().timestamp()+" "+arguments[i]);
	}
};

// Spawn bot using shards
require('./shard.js');

// Non-sharded / Regular
// require('./bot.js');