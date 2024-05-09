const Discord = require("discord.js")

async function addchannel(bot, message, msg, EmbedAuto, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Quel salon voulez-vous ajouter à la liste des salons ignorés par l'anti-spam ?**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.channels.first() || message.guild.channels.cache.get(collected.first().content)) {
                            const channel = collected.first().mentions.channels.first() ? collected.first().mentions.channels.first() : message.guild.channels.cache.get(collected.first().content)
                            await bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            const array = JSON.parse(req[0].antispamchannel)
                            if(array.includes(channel.id)) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌ ⁠${channel} est déjà ignoré par l'anti-spam.**`)
                                await EmbedAuto(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            array.push(channel.id)
                            await bot.db.query(`UPDATE antiraid SET antispamchannel = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ ${channel} est désormais ignoré par l'anti-spam.**`)
                            await EmbedAuto(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un salon.**`)
                            await EmbedAuto(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
        })
}

async function removechannel(bot, message, msg, EmbedAuto, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Quel salon voulez-vous retirer de la liste des salons ignorés par l'anti-spam ?**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.channels.first() || message.guild.channels.cache.get(collected.first().content)) {
                            const channel = collected.first().mentions.channels.first() ? collected.first().mentions.channels.first() : message.guild.channels.cache.get(collected.first().content)
                            await bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            const array = JSON.parse(req[0].antispamchannel)
                            if(!array.includes(channel.id)) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌ ⁠${channel} n'est pas ignoré par l'anti-spam.**`)
                                await EmbedAuto(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            array.splice(array.indexOf(channel.id), 1)
                            await bot.db.query(`UPDATE antiraid SET antispamchannel = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ ${channel} a bien été retiré de la liste des salons ignorés par l'anti-spam.**`)
                            await EmbedAuto(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un salon.**`)
                            await EmbedAuto(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
                          })
}
module.exports = {
    AddChannel: addchannel,
    RemoveChannel: removechannel
};