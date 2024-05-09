const Discord = require("discord.js")

exports.help = {
    name: "invite",
    category: 'othercommand',
    description: "Afficher l'invitation du bot.",
    aliases: ["i"]
  };
  
exports.run = async (bot, message, args) => { 
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `Ajoutez ${bot.user.username} à votre serveur !`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true })})
    .setColor('White')

    const bouton1 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Inviter ${bot.user.username}`)
    .setEmoji('🧨')
    .setURL(`https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot%20applications.commands&permissions=-1`);
    const bouton2 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Serveur support`)
    .setEmoji('<:dev:1145032258508570634>')
    .setURL('https://discord.gg/3PA53mfwSv');
    const bouton3 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Site internet`)
    .setEmoji('🔗')
    .setURL('https://discord.gg/3PA53mfwSv');

    const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3);

    message.reply({ embeds: [embed], components: [row] })
  }