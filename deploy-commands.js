
const { REST, Routes } = require('discord.js');
const { 
	clientId,
	guildId,
	token
} 
	= require('./config.json');

const fs = require('node:fs');
const path = require('node:path');

 /**
  * @dev Declares a variable named commands and assigns it the value of an empty array ([]).
  */
const commands = [];

/**
 * @dev Here, we're scanning the commands directory, reading files with a .js extension, and verifying 
 * 		whether each file contains an object named command with both data and execute properties. 
 * 		If this condition is met, we add it to the commands array.
 */

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

/**
 * @dev Construct and prepare an instance of the REST module
 */ 
const rest = new REST({ version: '10' }).setToken(token);

/**
 * @dev Here, we update the list of application (/) commands on the Discord server, using clientId and guildId to 
 * 		specify the application and server, respectively.
 */

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		
		console.error(error);
	}
})();