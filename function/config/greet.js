const Discord = require("discord.js")

async function addchannel(bot, message, msg, EmbedBienvenue, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Dans quel salon voulez-vous que les nouveaux membres soient ghost ping ?**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.channels.first() || message.guild.channels.cache.get(collected.first().content)) {
                            const channel = collected.first().mentions.channels.first() ? collected.first().mentions.channels.first() : message.guild.channels.cache.get(collected.first().content)
                            await bot.db.query(`SELECT * FROM bienvenue WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            const array = JSON.parse(req[0].ghostpingchannel)
                            if(array.includes(channel.id)) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌ Les nouveaux membres sont déjà ghost ping dans le salon ⁠${channel}.**`)
                                await EmbedBienvenue(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            array.push(channel.id)
                            await bot.db.query(`UPDATE bienvenue SET ghostpingchannel = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Les nouveaux membres seront bien ghost ping dans le salon ${channel}.**`)
                            await EmbedBienvenue(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un salon.**`)
                            await EmbedBienvenue(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
        })
}

async function removechannel(bot, message, msg, EmbedBienvenue, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Dans quel salon voulez-vous retirer le ghost ping des nouveaux membres ?**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.channels.first() || message.guild.channels.cache.get(collected.first().content)) {
                            const channel = collected.first().mentions.channels.first() ? collected.first().mentions.channels.first() : message.guild.channels.cache.get(collected.first().content)
                            await bot.db.query(`SELECT * FROM bienvenue WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            const array = JSON.parse(req[0].ghostpingchannel)
                            if(!array.includes(channel.id)) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌ ⁠Les nouveaux membres ne sont pas ghost ping dans le salon ${channel}.**`)
                                await EmbedBienvenue(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            array.splice(array.indexOf(channel.id), 1)
                            await bot.db.query(`UPDATE bienvenue SET ghostpingchannel = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Les nouveaux membres ne seront plus ghost ping dans le salon ${channel}.**`)
                            await EmbedBienvenue(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un salon.**`)
                            await EmbedBienvenue(bot, message, null, msg)  
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