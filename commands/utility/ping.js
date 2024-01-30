const{SlashCommandBuilder} = require('discord.js');

module.exports = {
    /**
     * @dev We're creating a new function within SlashCommandBuilder, setting its name and description. 
     *      This function will execute whenever there's an interaction that triggers it, responding with the message 'Pong!'.   
    */ 
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};