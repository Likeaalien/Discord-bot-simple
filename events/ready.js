const { Events } = require('discord.js');
 /**
  * @dev Initially, we export this object for use in other files. We assign the function the name Events.ClientReady. 
  * 	 When we launch the bot for the first time, it triggers a command indicating that the bot is online and operational.
  */
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};