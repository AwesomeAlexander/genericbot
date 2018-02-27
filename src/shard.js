const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./bot.js');

// Use a single shard unless you have needs otherwise,
// Discord API recommends 1 shard per 2500 servers.
Manager.spawn(1);