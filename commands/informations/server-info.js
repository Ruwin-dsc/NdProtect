const Discord = require("discord.js")

exports.help = {
    name: "server-info",
    category: 'information',
    description: "Afficher les informations sur le serveur",
    aliases: ["si", "serverinfo"]
};

  
exports.run = async (bot, message, args) => { 
    const guild = message.guild
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `Informations sur le serveur`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true })})
    .setColor('White')
    .setTitle(guild.name)
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setImage(guild.bannerURL({ dynamic: true, size: 2048 }))
    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}`})
    .addFields(
        { name: "**🖥️・Informations sur le serveur :**", value: `> **ID :** ${guild.id}\n> **Nom :** \`${guild.name}\`\n${guild.description ? `> **Description :** ${guild.description}\n` : ""}> **Date de création :** <t:${parseInt(guild.createdTimestamp / 1000)}:f> (<t:${parseInt(guild.createdTimestamp / 1000)}:R>)\n> **Propriétaire :** <@${guild.ownerId}> @${guild.members.cache.get(guild.ownerId).user.username}\n${guild.vanityURLCode ? `> **Invitation personnalisée :** [.gg/${guild.vanityURLCode}](https://discord.gg/${guild.vanityURLCode})` : ""}`}, 
        { name: "**📊・Statistiques du serveur :**", value: `> **Membres :** ${guild.memberCount} (${guild.presences.cache.filter((presence) => presence.status !== "offline").size} en ligne)\n> **Niveau de boost :** ${guild.premiumTier} (${guild.premiumSubscriptionCount} boosts) <a:boost:1234126529345355849>` }
    )

    const bouton1 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Icône`)
    .setURL(guild.iconURL({ dynamic: true, size: 2048 }) ? guild.iconURL({ dynamic: true, size: 2048 }) : "https://discord.gg/");
    const bouton2 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Bannière d'arrière plan`)
    .setURL(guild.bannerURL({ dynamic: true, size: 2048 }) ? guild.bannerURL({ dynamic: true, size: 2048 }) : "https://discord.gg/");
    const bouton3 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Bannière d'invitation`)
    .setURL(guild.splashURL({ dynamic: true, size: 2048 }) ? guild.splashURL({ dynamic: true, size: 2048 }) : "https://discord.gg/");

    const row = new Discord.ActionRowBuilder()
    if(guild.iconURL({ dynamic: true })) {
        row.addComponents(bouton1)
    }
    if(guild.bannerURL({ dynamic: true })) {
        row.addComponents(bouton2)
    }
    if(guild.splashURL({ dynamic: true })) {
        row.addComponents(bouton3)
    }
    if(guild.iconURL({ dynamic: true }) || guild.bannerURL({ dynamic: true }) || guild.splashURL({ dynamic: true })) message.reply({ embeds: [embed], components: [row]})
    else message.reply({ embeds: [embed]})
}   
