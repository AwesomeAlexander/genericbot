"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const Functions_1 = require("./Functions");
const Config_1 = require("./Config");
/**
 * Command class to be instantiazed for commands to be called by users using the bot
 */
class Command {
    /**
     * Creates a new Command object
     * @param name The name of the command
     * @param description Description of the command
     * @param onRun Function called when running the command
     * @param permissionsNeededToRun Optional: Any permissions you need to run the Command
     * @param aliases Optional: Aliases to reference the command by when calling
     * @param usageExamples Optional: Usage examples
     * @param override Whether the command's permissions can be overriden by developers. Defaults to value provided by config.yaml, which is client-wide. Do not change unless necessary for specific command.
     */
    constructor(name, description, onRun, permissionsNeededToRun, aliases, usageExamples, override = Config_1.default.override) {
        this.name = name;
        this.description = description;
        this.triggers = [name].concat(aliases || []);
        this.usageExamples = ((typeof usageExamples === "string") ? [usageExamples] : usageExamples);
        this.onRun = onRun;
        this.override = override;
        this.permissionsNeeded = Functions_1.generatePermissions(permissionsNeededToRun);
    }
    /**
     * Wrapper for running the command if provided permissions satisfy
     * @param client The Client (bot) object
     * @param message The Message object provided by discord.js detailing message data & metadata
     * @param args Arguments given when command is called
     */
    run(client, message, args) {
        if (typeof args === "string")
            args = Functions_1.parseTokens(args);
        let options = Functions_1.parseCommandOptions(args);
        // Test for help option
        if (['h', 'help'].some(opt => options.indexOf(opt) > -1)) {
            message.channel.send(this.sendHelp());
        }
        if (this.permissionsSatisfy(Functions_1.evaluatePermissions(message.author, message.channel))) {
            this.onRun(client, message, args, options);
        }
    }
    /**
     * Returns whether the permissions given satisfy this command's permissions,
     * and subsequently whether the command can be run by a user with those permissions.
     * @param perms Permissions to be compared.
     * @param override Whether to factor in superuser overrides.
     */
    permissionsSatisfy(perms, override = this.override) {
        if (override && perms.indexOf("SUPERUSER") > -1)
            return true;
        for (let p of this.permissionsNeeded) {
            if (p.startsWith("USER-") && perms.indexOf(p.substring(5)) > -1)
                return true; // OR - Quick out if hardcoded User
            if (!(perms.indexOf(p) > -1))
                return false; // AND - All must be true
        }
        return true;
    }
    /**
     * Gives a help command
     */
    sendHelp() {
        let out = new Discord.RichEmbed()
            .setTitle("Command Help: " + this.name)
            .setDescription(this.description)
            //.addBlankField()
            .setTimestamp();
        let val = "";
        // Aliases
        val = "";
        if (!!this.triggers && this.triggers.length > 1)
            val += (this.triggers.join('`, `') + '`').substring(this.name.length + 3);
        else
            val += "NONE";
        out.addField("Aliases", val);
        // Usage examples
        if (!!this.usageExamples && this.usageExamples.length > 1)
            out.addField('How To Use', '`' + this.usageExamples.join('`\n`') + '`');
        // Permissions needed
        val = "";
        if (!!this.permissionsNeeded && this.permissionsNeeded.length > 1)
            val += this.permissionsNeeded.join('\n');
        else
            val += "NONE";
        out.addField("Permissions Needed to Run", val);
        return out;
    }
}
exports.Command = Command;
/**
 * TODO
 */
class CommandHandler {
    // TODO: RECONSIDER DESIGN
    // Event based? would make easier for function runs - client.on('command')?
    // could then do Discord 'fire' command...?
    // crawler - can recurse it's own commandhandlers for each dir for modules
    constructor(client, name) {
        this.client = client;
        this.name = name;
    }
}
exports.CommandHandler = CommandHandler;
