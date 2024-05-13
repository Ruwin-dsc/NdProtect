const Discord = require('discord.js')

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, bot) {
        let embed
        const member = oldState.member || newState.member;
        bot.db.query(`SELECT * FROM logs WHERE guildId = "${newState.guild.id}"`, async (err, req) => {
            if(req.length < 1) return

            if (!newState.channel && oldState.channel !== newState.channel) {
                embed = new Discord.EmbedBuilder()
                .setDescription(`${member} a quitté le salon vocal <#${oldState.channel.id}> \`${oldState.channel.name}\``)
                .setColor("Red")
                .setAuthor({ name: `@${member?.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setTitle(`Salon vocal quitté`)
                .setFooter({ text: `ID de l'utilisateur : ${member.id}`})
            } else if (!oldState.channel && oldState.channel !== newState.channel) {
                embed = new Discord.EmbedBuilder()
                .setDescription(`${member} a rejoint le salon vocal <#${newState.channel.id}> \`${newState.channel.name}\``)
                .setColor("Green")
                .setAuthor({ name: `@${member?.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
                .setTimestamp()
                .setTitle(`Salon vocal rejoint`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: `ID de l'utilisateur : ${member.id}`})
            } else if(oldState.channel !== newState.channel)  {
                embed = new Discord.EmbedBuilder()
                .setDescription(`${member} a changé de salon vocal.`)
                .setColor("Blurple")
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setAuthor({ name: `@${member?.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv" })
                .setTitle(`Changement de salon vocal`)
                .setFooter({ text: `ID de l'utilisateur : ${member.id}`})
                .addFields(
                    { name: "Ancien salon :", value: `> ${oldState.channel} \`${oldState.channel.name}\``},
                    { name: "Nouveau salon :", value: `> ${newState.channel} \`${newState.channel.name}\``},
                )
            }

            const channel = newState.guild.channels.cache.get(req[0].channelMessage)
            if(channel) channel.send({ embeds: [embed]})
        })
    }
}