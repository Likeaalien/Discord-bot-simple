const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, WelcomeChannel } = require('discord.js');
const { token } = require('./config.json');

/**
 * @dev This serves as the central hub for engaging with the Discord API. Here, we define
 * 		how bots handle events by specifying them in the `intents` list, as outlined below.
 */
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers
	]
});

/** 
 * @dev Within this process, we scan through all command files within the event directory that have a .js extension.
 *		These files are then exported as objects, each containing event names. Depending on whether the event is meant
 		to execute once (event.once), it will trigger client.once, or client on.
 */
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles){
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if(event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
/** 
 * @dev "Within this context, we scan through all files with a .js extension located in the commands/utility directory.
 * 		 If a command object contains both data and execute, we include our command in the list of commands using command.data.name."
*/
client.commands = new Collection();
const commandsPath=path.join(__dirname, "commands/utility");
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ("data" in command && "execute" in command){
		client.commands.set(command.data.name, command);
	} else {
		console.log(`Warning the command at ${filePath} is missing a required "data" or "execute"`)
	}
}

client.login(token);