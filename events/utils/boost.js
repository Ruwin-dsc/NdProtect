const Discord = require('discord.js')

module.exports = {
  name: "guildMemberUpdate",
  async execute(oldMember, newMember, bot) {
    bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${newMember.guild.id}"`, async (err, req) => {
        if(req.length < 1 || req[0].boost == "off") return

        const oldBoostDate = oldMember.premiumSinceTimestamp;
        const newBoostDate = newMember.premiumSinceTimestamp;

        const channel = oldMember.guild.channels.cache.get(req[0].channelboost)
        const embed = new Discord.EmbedBuilder()
        .setDescription(`${newMember} est un nouveau booster sur le serveur ! ${bot.emoji.boost}`)
        .setColor("#f47fff")
        .setAuthor({ name: `${newMember.guild.members.cache.get(newMember.id).user.username} vient de booster le serveur !`, iconURL: newMember.guild.members.cache.get(newMember.id).displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
        if (!oldBoostDate && newBoostDate) channel.send({ embeds: [embed]})
        const embed2 = new Discord.EmbedBuilder()
        .setDescription(`${newMember} est booster sur le serveur depuis le <t:${parseInt(newMember.premiumSinceTimestamp / 1000)}:f> ! ${bot.emoji.boost}`)
        .setColor("#f47fff")
        .setAuthor({ name: `${newMember.guild.members.cache.get(newMember.id).user.username} vient de booster le serveur !`, iconURL: newMember.guild.members.cache.get(newMember.id).displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
        if(oldBoostDate && newBoostDate && newBoostDate > oldBoostDate) channel.send({ embeds: [embed2]})
        

    })
}}