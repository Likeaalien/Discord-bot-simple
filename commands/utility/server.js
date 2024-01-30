const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	/**
	 * @dev We're creating a new function within SlashCommandBuilder, where we set its name and description. 
	 * 		This function executes upon interaction, providing information about the server's name and member count when called.   
	 */ 
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};