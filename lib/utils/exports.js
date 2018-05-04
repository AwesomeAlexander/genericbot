"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a formatted timestamp of the given date,
 * or current date if none is given.
 * @param {Date} date
 * @returns {string} Formatted date.
 */
function timestamp(date = new Date()) {
    return date.toJSON().replace("T", " ").substring(0, 19);
}
exports.timestamp = timestamp;
/**
 * Logs every message given.
 * If a message begins with ':',
 * every log after that will have the type/source
 * @param args All things to be logged
 */
function logger(...args) {
    let type; // The type / source given
    for (let i of args) { // Looping through all args
        if (typeof i === 'string' && i.charAt(0) === ':') { // Set type
            // TODO: figure out why there is no <string>.startsWith
            type = i.substring(1).toUpperCase();
        }
        else { // Regular log
            console.log(`[${timestamp()}]${!!type ? ` ${type} | ` : ' '}${i}`);
            // Error Log as well
            if (i instanceof Error)
                console.error(i);
        }
    }
}
exports.logger = logger;
/**
 * Checks if a variable is a certain type
 * @param variable The variable to be checked
 * @param classType The class to be checked by
 */
function isType(variable, classType /*: typeof Object*/) {
    return variable instanceof classType /* && typeof variable === classType*/;
}
exports.isType = isType;
/**============================================================================================**/
// Export all other util classes & files
// Is there a better way to do this? using default?
var Command_1 = require("./Command");
exports.Command = Command_1.Command;
var Client_1 = require("./Client");
exports.Client = Client_1.Client;
