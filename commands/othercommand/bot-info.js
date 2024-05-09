const Discord = require("discord.js")
const os = require('os')

exports.help = {
    name: "bot-info",
    category: 'othercommand',
    description: "Afficher les informations sur le bot.",
    aliases: ["bi", "botinfo"]
  };
  
exports.run = async (bot, message, args) => { 
    const hostname = os.hostname();
    let cpuName = "Aucun";
    const cpus = os.cpus();
    if (cpus.length > 0) {
        cpuName = cpus[0].model;
    }
    const usedMemoryInMB = process.memoryUsage().heapUsed / 1024 / 1024;



    const startTime = Date.now() - (process.uptime() * 1000);
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `Informations sur le bot`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true})})
    .setColor('White')
    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
    .addFields(
    { 
        name: `**🤖・Identité :**\n`,
        value: `> **Nom :** ${bot.user} \`${bot.user.tag}\`\n` +
        `> **ID :** ${bot.user.id}\n` +
        `> **Date de création :** <t:${Math.round(bot.user.createdTimestamp / 1000)}:R>\n` 
    }, 
    {
        name: `**${bot.emoji.developer}・Développeur :**\n`,
        value: `> **Nom : <@820361590826205215> @ruwinou ❤️**\n` +
        `> **ID :** 820361590826205215\n`
    },
    {
        name: `**📊・Statistiques du bot :**\n`,
        value: `> **Démarré :** <t:${Math.round(startTime / 1000)}:f> (<t:${Math.round(startTime / 1000)}:R>)\n` +
        `> **Serveurs :** ${bot.guilds.cache.size} (1 shards)\n` +
        `> **Utilisateurs :** ${bot.users.cache.size}\n` +
        `> **Salons :** ${bot.channels.cache.size}\n` +
        `> **Rôles :** ${bot.guilds.cache.reduce((acc, guild) => acc + guild.roles.cache.size, 0)}\n` +
        `> **Boosts : ** ${bot.guilds.cache.reduce((acc, guild) => acc + (guild.premiumSubscriptionCount || 0), 0)}\n` +
        `> **Ping avec l'API Discord :** ${bot.ws.ping} ms\n`
    },
    {
        name: `**🖥️・Informations techniques :**\n`,
        value: `> **Hébergeur :** ${hostname}\n` +
        `> **Système d'exploitation :** ${process.platform}\n` +
        `> **Processeur :** ${cpuName}\n` +
        `> **Mémoire utilisée :** ${usedMemoryInMB.toFixed(2)} Mo\n` +
        `> **Node.js :** ${process.version}\n` +
        `> **discord.js :** v${Discord.version}`
    }
    )
    .setTimestamp()
    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}`})

    message.reply({ embeds: [embed]})
}