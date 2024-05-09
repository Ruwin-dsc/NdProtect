const logs = {
    "channelAntiraid": "Anti-raid",
    "channelMods": "Modération",
    "channelMember": "Membres",
    "channelGuild": "Serveur, salons et rôles",
    "channelMessage": "Messages et vocaux",

}
const Discord = require("discord.js")

async function configsalon(bot, message, msg, EmbedLogs, filter2, textSplit) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Dans quel salon voulez-vous envoyez les logs "${logs[textSplit[1]]}" ?\nVous pouvez taper \`remove\` pour supprimer le salon configuré.**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.channels.first() || message.guild.channels.cache.get(collected.first().content)) {
                            const channel = collected.first().mentions.channels.first() ? collected.first().mentions.channels.first() : message.guild.channels.cache.get(collected.first())
                            await bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            if(req[0][textSplit[1]] == channel.id) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌  Salon des logs "${logs[textSplit[1]]}" déjà configuré sur ${channel}.**`)
                                await EmbedLogs(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            await bot.db.query(`UPDATE logs SET ${textSplit[1]} = "${channel.id}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Salon des logs "${logs[textSplit[1]]}" configuré sur ${channel}.**`)
                            await EmbedLogs(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else if(collected.first().content == "remove") {
                            await bot.db.query(`UPDATE utilitaire SET ${textSplit[1]} = "${null}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Salon des logs "${logs[textSplit[1]]}" supprimé.**`)
                            await EmbedLogs(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        } 
                        else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un salon.**`)
                            await EmbedLogs(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
        })
} 

async function configsalonAuto(bot, message, msg, EmbedLogs) {
    let channel1, channel2, channel3, channel4, channel5, category
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        if(!message.guild.channels.cache.get(req[0].category)) category = await message.guild.channels.create({ name: "LOGS", type: Discord.ChannelType.GuildCategory, permissionsOverwrites: [{id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]})
        else category = await message.guild.channels.cache.get(req[0].category).edit({ name: "LOGS", type: Discord.ChannelType.GuildCategory, permissionsOverwrites: [{id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]})

        if(!message.guild.channels.cache.get(req[0].channelAntiraid)) channel1 = await message.guild.channels.create({ name: "logs-antiraid", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        else channel1 = await message.guild.channels.cache.get(req[0].channelAntiraid).edit({ name: "logs-antiraid", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        if(!message.guild.channels.cache.get(req[0].channelMods)) channel2 = await message.guild.channels.create({ name: "logs-modération", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        else channel2 = await message.guild.channels.cache.get(req[0].channelMods).edit({ name: "logs-modération", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        if(!message.guild.channels.cache.get(req[0].channelMember)) channel3 = await message.guild.channels.create({ name: "logs-membres", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        else channel3 = await message.guild.channels.cache.get(req[0].channelMember).edit({ name: "logs-membres", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        if(!message.guild.channels.cache.get(req[0].channelGuild)) channel4 = await message.guild.channels.create({ name: "logs-serveur", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        else channel4 = await message.guild.channels.cache.get(req[0].channelGuild).edit({ name: "logs-serveur", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        if(!message.guild.channels.cache.get(req[0].channelMessage	)) channel5 = await message.guild.channels.create({ name: "logs-messages", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});
        else channel5 = await message.guild.channels.cache.get(req[0].channelMessage).edit({ name: "logs-messages", type: Discord.ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: message.guild.id, deny: [Discord.PermissionsBitField.Flags.ViewChannel]}]});

        await bot.db.query(`UPDATE logs SET category = "${category.id}", channelAntiraid = "${channel1.id}", channelMods = "${channel2.id}", channelMember = "${channel3.id}", channelGuild = "${channel4.id}", channelMessage = "${channel5.id}" WHERE guildId = ${message.guild.id}`);

        const embed = new Discord.EmbedBuilder()
        .setDescription(`**✅ Salons des logs configurés.**`)
        .setColor("Green")

        await message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
        await EmbedLogs(bot, message, null, msg)
    })
}

module.exports = {
    configsalon: configsalon,
    configsalonAuto: configsalonAuto
};