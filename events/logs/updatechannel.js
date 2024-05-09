const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "channelUpdate",
  async execute(oldChannel, newChannel, bot) {
    if(oldChannel.name == newChannel.name) return
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${newChannel.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setColor("Orange")
        .setTimestamp()
        .setTitle(`Modification d'un salon`)
        .setDescription(`Salon modifié : ${newChannel} \`${oldChannel.name}\`.`)
        .setFooter({ text: `ID du salon : ${newChannel.id}` })
        .addFields(
            { name: "Nom :", value: `> \`${oldChannel.name}\` ➔ \`${newChannel.name}\` `}
        )
        const channel2 = newChannel.guild.channels.cache.get(req[0].channelGuild)
        if(channel2) channel2.send({ embeds: [embed]})
    })
}}