"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
exports.Discord = Discord;
const Config_1 = require("./Config");
exports.config = Config_1.default;
/**
 * Modified Discord Bot Client with added stuff.
 */
class Client extends Discord.Client {
    constructor() {
        super(...arguments);
        this.tmpData = {};
        this.commands = [];
        this.webhooks = [];
    }
}
exports.Client = Client;
// Other files' exports
__export(require("./Functions"));
__export(require("./Commands"));
