const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	/**
	 * @dev We're crafting a new function within SlashCommandBuilder, defining its name and description.
	 * 		This function triggers upon interaction, and reply to the interaction with a message containing
	 * 		details such as the username of the user initiating the interaction and information about when
	 * 		the member joined.
	 */ 
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};