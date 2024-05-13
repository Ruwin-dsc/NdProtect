const Discord = require('discord.js')
const time = {
    60: "1m",
    300: "5m", 
    900: "15m",
    1800: "30m",
    3600: "1h"
}
module.exports = {
  name: "guildUpdate",
  async execute(oldGuild, newGuild, bot) {
    let verify = false
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${newGuild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setColor("Orange")
        .setTimestamp()
        .setTitle(`Mise à jour du serveur`)
        .setFooter({ text: `ID du serveur : ${newGuild.id}` })
        .setThumbnail(newGuild.iconURL({ dynamic: true }))
        .setAuthor({ name: newGuild.name, iconURL: newGuild.iconURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv"})
        
        if(oldGuild.name !== newGuild.name) {
            verify = true
            embed.addFields({ name: "Nom :", value: `> \`${oldGuild.name}\` ➔ \`${newGuild.name}\``})
        }
        if (oldGuild.systemChannel !== newGuild.systemChannel) {
            verify = true
            embed.addFields({ name: "Salon des messages système :", value: `> ${oldGuild.systemChannel || "Aucun"} ➔ ${newGuild.systemChannel || "Aucun"}`})
        }
        if(oldGuild.premiumProgressBarEnabled !== newGuild.premiumProgressBarEnabled) {
            verify = true
            embed.addFields({ name: "Barre des boosts :", value: `> ${oldGuild.premiumProgressBarEnabled == true ? "Activée" : "Désactivée"} ➔ ${newGuild.premiumProgressBarEnabled == true ? "Activée" : "Désactivée"}`})
        }
        if (oldGuild.defaultMessageNotifications !== newGuild.defaultMessageNotifications) {
            verify = true
            embed.addFields({ name: "Notification par défaut :", value: `> ${oldGuild.defaultMessageNotifications == 0 ? "Tous les messages" : "@mentions seulement"} ➔ ${newGuild.defaultMessageNotifications == 0 ? "Tous les messages" : "@mentions seulement"}`})
        }
        if(oldGuild.afkChannel !== newGuild.afkChannel || oldGuild.afkTimeout !== newGuild.afkTimeout) {
            verify = true
            embed.addFields({ name: "Inactivité :", value: `> **Salon inactif :** ${oldGuild.afkChannel || "Aucun"} ➔ ${newGuild.afkChannel || "Aucun"}\n> **Durée Maximum d'inactivité :** ${time[oldGuild.afkTimeout]} ➔ ${time[newGuild.afkTimeout]}`})
        }
        if(verify == false) return
        const channel2 = newGuild.channels.cache.get(req[0].channelGuild)
        if(channel2) channel2.send({ embeds: [embed]})
    })
  }
}