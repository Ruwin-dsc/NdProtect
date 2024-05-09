const Discord = require("discord.js")

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

module.exports = {
    name: 'channel-info',
    description: 'Afficher les informations sur un salon.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "channel",
          name: "channel",
          description: "Salon dont vous voulez obtenir des informations.",
          required: false,
          autocomplete: false,
        },
      ],
    async run(bot, message, args) {
    const channel = args.getChannel("channel") || message.channel

    const embed = new Discord.EmbedBuilder()
    .setTitle(channel.name)
    .addFields(
        { name: "**📚・Informations sur le salon :**\n", value: `> **ID :** ${channel.id}\n> **Nom :** ${channel} \`${channel.name}\`\n> **Sujet :** ${channel.topic || "Aucun"}\n> **Date de création :** <t:${parseInt(channel.createdTimestamp / 1000)}:R> (<t:${parseInt(channel.createdTimestamp / 1000)}:f>)\n> **Type :** ${channelTypes[parseInt(channel.type)]}\n> **Catégorie :** ${channel.parent || "Aucune"}`},
        { name: "**🔧・Informations avancées :**\n", value: `> **Mode lent :** ${parseInt(channel.rateLimitPerUser) !== 0 ? time(parseInt(channel.rateLimitPerUser)) : "Désactiver"}\n> **NSFW :** ${channel.nsfw ? "Oui" : "Non"}`}
    )
    .setColor('White')
    .setAuthor({ name: `Informations sur le salon`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true })})
    .setTimestamp()
    .setFooter({ iconURL: message.user.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.user.username}`})

    message.reply({ embeds: [embed]})
    }
}

function time(timeString) {
    if (timeString < 60) {
        return timeString + "s";
    } else if (timeString < 3600) {
        const minutes = Math.floor(timeString / 60);
        return minutes + "m";
    } else if (timeString < 86400) {
        const heures = Math.floor(timeString / 3600);
        return heures + "h";
    } else {
        const jours = Math.floor(timeString / 86400);
        return jours + "d";
    }
}