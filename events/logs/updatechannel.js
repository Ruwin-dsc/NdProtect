const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "channelUpdate",
  async execute(oldChannel, newChannel, bot) {
    let verify = false
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${newChannel.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setColor("Orange")
        .setTimestamp()
        .setTitle(`Modification d'un salon`)
        .setDescription(`Salon modifié : ${newChannel} \`${oldChannel.name}\`.`)
        .setFooter({ text: `ID du salon : ${newChannel.id}` })
   
        if(oldChannel.name !== newChannel.name) {
            verify = true
            embed.addFields({ name: "Nom :", value: `> \`${oldChannel.name}\` ➔ \`${newChannel.name}\` `})
        }
        if(oldChannel.nsfw !== newChannel.nsfw) {
            verify = true
            embed.addFields({ name: "**Salon soumis à une limite d'âge :**", value: `> \`${oldChannel.nsfw == true ? "Oui" : "Non"}\` ➔ \`${newChannel.nsfw == true ? "Oui" : "Non"}\` `})
        }
        const channel2 = newChannel.guild.channels.cache.get(req[0].channelGuild)
        if(channel2) channel2.send({ embeds: [embed]})
    })
}}