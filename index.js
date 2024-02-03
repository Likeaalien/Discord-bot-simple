const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, WelcomeChannel, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
// ne zaboravi EmbedBuilder u greeting.js da dodas
const moment = require('moment');

/**
* @dev This serves as the central hub for engaging with the Discord API. Here, we define
*      how bots handle events by specifying them in the `intents` list, as outlined below.
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

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
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

const commandsPath = path.join(__dirname, "commands/utility");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Warning the command at ${filePath} is missing a required "data" or "execute"`)
    }
}
// ****************** TESTS ***********************
// Working Embed (TODO) Make it into SlashCommands as well

client.on('guildMemberAdd', (member) => { 
	const embed = new EmbedBuilder() 
	  .setAuthor({name: 'Bot_v_0'})
	  .setTitle('Come Get Some') 
    .setDescription(`Let\'s rock ${member} joined the server `)
    .setThumbnail('https://static-00.iconduck.com/assets.00/discord-icon-256x256-9roejvqx.png')
    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 128 }))
    .addFields(
      {name: 'Join date', value: `${moment(member.joinedAt).format ('DD/MM/YYYY, HH:mm:ss')}` },
      {name: 'Account creation', value: `${moment(member.user.createdTimestamp).format('DD/MM/YYYY, HH:mm:ss')}`},
      {name: 'Member count on the server', value: `${member.guild.memberCount}`},
      {name: 'Avatar\'s picture', value: ' '}
    )
	  .setTimestamp()
    .setColor('Random')
	  .setFooter(
      { text: 'Damn I\'m Good', iconURL: 'https://gcdn.thunderstore.io/live/repository/icons/Money_Makers-Money_Maker_Business-0.1.0.png.256x256_q95.jpg' }
    )
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome')

  welcomeChannel.send({embeds: [embed]});
  })

client.login(token);