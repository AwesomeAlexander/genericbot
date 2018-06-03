"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("./utils/exports");
const fs = require("fs");
const path = require("path");
// The Client ("bot") to be made
const client = new exports_1.Client();
// Commands
fs.readdir(path.join(__dirname, 'commands'), "utf8", (err, files) => {
    if (err)
        exports_1.logger(":ERROR", err);
    files.forEach(file => {
        Promise.resolve().then(() => require(path.join(__dirname, 'commands', file))).then(ret => {
            client.commands.push(ret);
        }).catch(console.error);
    });
});
// Events
fs.readdir(path.join(__dirname, 'events'), "utf8", (err, files) => {
    if (err)
        exports_1.logger(":ERROR", err);
    files.forEach(file => {
        let name = file.split(".")[0];
        Promise.resolve().then(() => require(path.join(__dirname, 'events', file))).then(ret => {
            client.on(name, (...args) => ret(client, args));
        }).catch(console.error);
    });
});
exports.default = client;
