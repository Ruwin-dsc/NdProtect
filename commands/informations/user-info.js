const Discord = require("discord.js")

exports.help = {
    name: "user-info",
    category: 'information',
    description: "Afficher les informations sur un utilisateur",
    aliases: ["ui", "userinfo"]
};

exports.run = async (bot, message, args) => {
    message.user = message.author
    let embed
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    user = message.guild.members.cache.get(user?.id) 
    let bannerURL
    if(user || !args[0]) {
    if(!args[0]) user = message.guild.members.cache.get(message.author.id)
    bannerURL = await user.fetch().then((u) => u.user?.bannerURL({ dynamic: true, size: 2048 }))
    const flags = {
        Staff: bot.emoji.staff,
        Partner: bot.emoji.partner,
        BugHunterLevel1: bot.emoji.bughunter1,
        BugHunterLevel2: bot.emoji.bughunter2,
        Hypesquad: bot.emoji.hypesquad,
        HypeSquadOnlineHouse2: bot.emoji.h2,
        HypeSquadOnlineHouse1: bot.emoji.h1,
        HypeSquadOnlineHouse3: bot.emoji.h3,
        PremiumEarlySupporter: bot.emoji.premium,
        VerifiedDeveloper: bot.emoji.developer,
        ActiveDeveloper: bot.emoji.activedev,
        CertifiedModerator: bot.emoji.certifiedmod
    };

    const UserBadges = (await user.user.fetchFlags()).toArray().map(flag => flags[flag]).join(", ")

    const embedNo = new Discord.EmbedBuilder()
        .setColor('Red')
        .setDescription(`**❌ Cet utilisateur n'existe pas.**`)
    if (!user) return message.reply({ embeds: [embedNo] })

    embed = new Discord.EmbedBuilder()
        .setTitle(user.displayName || user.user.displayName)
        .setColor("White")
        .setAuthor({ name: `Informations sur l'utilisateur`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setFooter({ iconURL: message.user.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.user.username}` })
        .addFields(
            { name: "**👤・Informations sur l'utilisateur :**", value: `> **ID :** ${user.id}\n> **Nom :** ${user} **${user.user.username}**\n${UserBadges.length !== 0 ? `> **Badges :** ${UserBadges}\n` : ""}> **Création :** <t:${parseInt(user.user.createdTimestamp / 1000)}:f> (<t:${parseInt(user.user.createdTimestamp / 1000)}:R>)\n> **Bot :** ${user.user.bot ? "✅ Oui" : "❌ Non"}` },
            { name: "**🖥️・Informations sur le serveur :**", value: `${user.nickname ? `> Pseudo: \`${user.nickname}\`\n` : ""}> **Rejoint le :** <t:${parseInt(user.joinedTimestamp / 1000)}:f> (<t:${parseInt(user.joinedTimestamp / 1000)}:R>)` }
        )
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setImage(bannerURL)
    } else {
        user = await bot.users.fetch(args[0])
        const embedNo = new Discord.EmbedBuilder()
        .setColor('Red')
        .setDescription(`**❌ Cet utilisateur n'existe pas.**`)
        if (!user) return message.reply({ embeds: [embedNo] })
        bannerURL = await user.fetch().then((user) => user.bannerURL({ format: "gif", dynamic: true, size: 4096 }));
        embed = new Discord.EmbedBuilder()
        .setTitle(user.displayName || user.user.displayName)
        .setColor("White")
        .setAuthor({ name: `Informations sur l'utilisateur`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setFooter({ iconURL: message.user.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.user.username}` })
        .addFields(
            { name: "**👤・Informations sur l'utilisateur :**", value: `> **ID :** ${user.id}\n> **Nom :** ${user} **${user.username}**\n> **Création :** <t:${parseInt(user.createdTimestamp / 1000)}:f> (<t:${parseInt(user.createdTimestamp / 1000)}:R>)\n> **Bot :** ${user.bot ? "✅ Oui" : "❌ Non"}` },
            { name: "**🏛️・Badges de l'utilisateur :**", value: `> **🧨 Utilisateur du bot**` }
        )
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setImage(bannerURL)
    }
    const bouton1 = new Discord.ButtonBuilder()
        .setStyle('Link')
        .setLabel(`Avatar`)
        .setURL(user.displayAvatarURL({ dynamic: true, size: 2048 }) ? user.displayAvatarURL({ dynamic: true, size: 2048 }) : "https://discord.gg/");
    const bouton2 = new Discord.ButtonBuilder()
        .setStyle('Link')
        .setLabel(`Bannière de profil`)
        .setURL(bannerURL ? bannerURL : "https://discord.gg/");
    const bouton3 = new Discord.ButtonBuilder()
        .setStyle('Link')
        .setLabel(`Avatar sur le serveur`)
        .setURL(user.avatarURL({ dynamic: true, size: 2048 }) ? user.avatarURL({ dynamic: true, size: 2048 }) : "https://discord.gg/");

    const row = new Discord.ActionRowBuilder()
    if (user.displayAvatarURL({ dynamic: true })) {
        row.addComponents(bouton1)
    }
    if (user.avatarURL({ dynamic: true }) && message.guild.members.cache.get(user.id)) {
        row.addComponents(bouton3)
    }
    if (bannerURL) {
        row.addComponents(bouton2)
    }

    return message.reply({ embeds: [embed], components: [row] })
}