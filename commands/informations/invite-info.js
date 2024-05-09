const Discord = require("discord.js")

exports.help = {
    name: "invite-info",
    category: 'information',
    description: "Afficher les informations sur une invitation Discord.",
    aliases: ["ii", "inviteinfo"]
};

  const channelTypes = {
    0: "Salon Textuel",
    1: "Message Privé",
    2: "Salon Vocaux",
    3: "Groupe Message Privé",
    4: "Catégorie",
    5: "Salon d'annonce",
    10: "Fils de nouveauté",
    11: "Fils Publique",
    12: "Fils Privé",
    13: "Stage",
    14: "GuildDirectory",
    15: "Forum",
    16: "Média"
  }
  
exports.run = async (bot, message, args) => { 
    const embed = new Discord.EmbedBuilder()
    .setColor('Red')
    .setDescription(`**❌ Vous devez envoyer une invitation.**`)
    if(!args[0]) return message.reply({ embeds: [embed]})

    try {
        const invite = await bot.fetchInvite(args[0])
        const guild = invite.guild
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Informations sur l'invitation`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true })})
        .setTitle(guild.name)
        .addFields(
            { name: "**🖥️・Informations sur le serveur :**", value: `> **ID :** ${guild.id}\n> **Nom :** \`${guild.name}\`\n${guild.description ? `> **Description :** ${guild.description}\n` : ""}> **Date de création :** <t:${parseInt(guild.createdTimestamp / 1000)}:f> (<t:${parseInt(guild.createdTimestamp / 1000)}:R>)\n> **Membres :** ${invite.memberCount} (${invite.presenceCount} en ligne)\n${guild.vanityURLCode ? `> **Invitation personnalisée :** [.gg/${guild.vanityURLCode}](https://discord.gg/${guild.vanityURLCode})` : ""}` },
            { name: "**🔗・Informations sur l'invitation :**", value: `> **Salon :** \`#${invite.channel.name}\`\n> **Type :** ${channelTypes[invite.channel.type]}\n> **NSFW :** ${invite.channel.nsfw ? "Oui" : "Non"}`}
        )
        .setColor('White')
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setImage(guild.bannerURL({ dynamic: true, size: 2048 }))
        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}`})
        if(invite.inviterId) {
            const user = await bot.users.fetch(invite.inviterId)
            embed.addFields(
                { name: "**👤・Créateur de l'invitation :**", value: `> **ID :** ${user.id}\n> **Nom :** <@${user.id}> **@${user.username}**` }
            )
        }

    const bouton1 = new Discord.ButtonBuilder()
    .setStyle('Link')
    .setLabel(`Icône`)
    .setURL(guild.iconURL({ dynamic: true, size: 2048 }) ? guild.iconURL({ dynamic: true, size: 2048 }) : "https://discord.gg/" );
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

    message.reply({ embeds: [embed], components: [row]})
    } catch(e) {
    const embed = new Discord.EmbedBuilder()
    .setColor('Red')
    .setDescription(`**❌ Cette invitation est invalide.**`)

    return message.reply({ emebds: [embed]})
    }
}