const Discord = require("discord.js")

async function configsalon(bot, message, msg, EmbedUtilitaire, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Dans quel salon voulez-vous envoyez les notifications de Boost ?\nVous pouvez taper \`remove\` pour supprimer le salon configuré.**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.channels.first() || message.guild.channels.cache.get(collected.first().content)) {
                            const channel = collected.first().mentions.channels.first() ? collected.first().mentions.channels.first() : message.guild.roles.cache.get(collected.first())
                            await bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            if(req[0].channelboost == channel.id) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌ ⁠Le salon ${channel} est déjà configuré.**`)
                                await EmbedUtilitaire(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            await bot.db.query(`UPDATE utilitaire SET channelboost = "${channel.id}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Notifications de Boost activées sur ${channel}.**`)
                            await EmbedUtilitaire(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else if(collected.first().content == "remove") {
                            await bot.db.query(`UPDATE utilitaire SET channelboost = "${null}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Salon des notifications de Boost supprimé.**`)
                            await EmbedUtilitaire(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        } 
                        else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un salon.**`)
                            await EmbedUtilitaire(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
        })
} 

module.exports = {
    configsalon: configsalon,
};