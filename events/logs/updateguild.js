const Discord = require('discord.js')

module.exports = {
  name: "guildUpdate",
  async execute(oldGuild, newGuild, bot) {
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${newGuild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setColor("Orange")
        .setTimestamp()
        .setTitle(`Mise à jour du serveur`)
        .setFooter({ text: `ID du serveur : ${newGuild.id}` })
        .setThumbnail(newGuild.iconURL({ dynamic: true }))
        .setAuthor({ name: newGuild.name, iconURL: newGuild.iconURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv"})
        
        if(oldGuild.name !== newGuild.name) {
            embed.addFields({ name: "Nom :", value: `> \`${oldGuild.name}\` ➔ \`${newGuild.name}\``})
        }
        if (oldGuild.systemChannel !== newGuild.systemChannel) {
            embed.addFields({ name: "Salon des messages système :", value: `> ${oldGuild.systemChannel || "Aucun"} ➔ ${newGuild.systemChannel || "Aucun"}`})
        }
        const channel2 = newGuild.channels.cache.get(req[0].channelGuild)
        if(channel2) channel2.send({ embeds: [embed]})
    })
  }
}