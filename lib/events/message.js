"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("../utils/exports");
/**
 * Function to be executed when the 'message' event is fired.
 */
function default_1(client, message) {
    // Runs command if the message is triggering it.
    if (message.content.startsWith(exports_1.config.prefix)) {
        let msg = message.content.substring(exports_1.config.prefix.length);
        let tokenArgs = exports_1.parseTokens(msg);
        for (let comm of client.commands) {
            if (comm.triggers.indexOf(tokenArgs[0]) > -1) {
                comm.run(client, message, tokenArgs.slice(1)); // Run command.
                break; // (There should be no repeats)
            }
        }
    }
}
exports.default = default_1;
