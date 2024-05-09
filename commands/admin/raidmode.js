const Discord = require("discord.js");

exports.help = {
    name: "raidmode",
    category: 'admin',
};

exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Administrateur.**`)

        return message.reply({ embeds: [embed] })
    } else {
        bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if(req[0].raidmode == "off") {
            message.guild.disableInvites(true)
            const embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`✅ **Mode raid activé avec succès.**`)
            bot.db.query(`UPDATE bot SET raidmode = "on" WHERE guildId = ${message.guild.id}`);
            message.reply({ embeds: [embed]})
            const whitelist = JSON.parse(req[0].whitelist)
            whitelist.push(message.guild.ownerId)
            bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if(req.length < 1) return
                const embedLogs = new Discord.EmbedBuilder()
                .setTitle(`Activation du mode raid`)
                .addFields({ name: "Auteur :", value: `> ${message.author} **@${message.author.username}**`})
                .setFooter({ text: `ID du serveur: ${message.guild.id} `})
                .setTimestamp()
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setColor("Orange")
                const channel = message.guild.channels.cache.get(req[0].channelAntiraid)
                if(channel) channel.send({ embeds: [embedLogs], content: `${whitelist.map(w => `<@${w}>`).join(", ")}`})
            })
        } else {
            message.guild.disableInvites(false)
            const embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`✅ **Mode raid désactivé avec succès.**`)
            bot.db.query(`UPDATE bot SET raidmode = "off" WHERE guildId = ${message.guild.id}`);
            message.reply({ embeds: [embed]})
            const whitelist = JSON.parse(req[0].whitelist)
            whitelist.push(message.guild.ownerId)
            bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if(req.length < 1) return
                const embedLogs = new Discord.EmbedBuilder()
                .setTitle(`Activation du mode raid`)
                .addFields({ name: "Auteur :", value: `> ${message.author} **@${message.author.username}**`})
                .setFooter({ text: `ID du serveur: ${message.guild.id} `})
                .setTimestamp()
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setColor("Orange")
                const channel = message.guild.channels.cache.get(req[0].channelAntiraid)
                if(channel) channel.send({ embeds: [embedLogs], content: whitelist.map(w => `<@${w}>`).join(", ")})
            })
        }
    })
    }
}