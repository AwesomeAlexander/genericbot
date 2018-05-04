"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
/**
 * Modified Discord Bot Client with added stuff.
 */
class Client extends Discord.Client {
    constructor() {
        super(...arguments);
        this.data = {};
    }
    comparePerms(hasPerms, needsPerms, override = true) {
        if (override && hasPerms.includes("SUPERUSER"))
            return true;
        for (let perm of needsPerms) {
            if (!hasPerms.includes(needsPerms))
                return false;
        }
        return true;
    }
    evaluatePerms(user, context = null) {
        let out = [];
        if (context && user instanceof Discord.GuildMember) {
            let contextPerms = user.permissionsIn(context).serialize();
            for (let i in contextPerms)
                if (contextPerms[i])
                    out.push(i);
        }
        // TODO: Add in custom permissions (e.g. "MODERATE") tied in with db
        // Adds Developers
        // if (config.developers.includes(user.id)) out.push("SUPERUSER");
        return out;
    }
}
exports.Client = Client;
