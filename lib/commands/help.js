"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exports_1 = require("../utils/exports");
/**
 * What the command should do when called.
 * @param client The Client (Bot) object.
 * @param message The message object provided by discord.js giving information about the message.
 * @param args Token arguments of the message content, after the prefix and command call.
 */
function whenCalled(client, message, args, options) {
    var out = "**Commands** (accessible to you):\n";
    for (let command of client.commands)
        if (command.permissionsSatisfy(exports_1.evaluatePermissions(message.author, message.channel)))
            out += `\`${exports_1.config.prefix}${command.name}\` • ${command.description}\n`;
    out += "(For further information on a command, do `{p}command -h` or `{p}command --help`)";
    message.channel.send(new exports_1.Discord.RichEmbed()
        .setTitle("Help")
        .setDescription(out)
        .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.avatarURL)
        .setTimestamp());
}
exports.default = new exports_1.Command("help", // The name of the command, and how it is called by users.
"Help command. Gives this message.", // Description of what the command does, used in command help.
whenCalled, // Function (defined above) that runs when the command is run.
[], // Permissions needed to run the command.
['halp', 'helpme', 'h'], // Any additional aliases the user can call the command by.
[] // Usage examples - used in 'help' description.
);
