const{SlashCommandBuilder} = require('discord.js');

module.exports = {
    // respond to the function
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        console.log(interaction);
        await interaction.reply('Pong!');
    },
    
};



