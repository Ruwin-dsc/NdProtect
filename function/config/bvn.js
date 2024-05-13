const Discord = require("discord.js")

async function addrole(bot, message, msg, EmbedBienvenue, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Quel rôle voulez-vous ajouter aux rôles de bienvenue ?**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.roles.first() || message.guild.roles.cache.get(collected.first().content)) {
                            const role = collected.first().mentions.roles.first() ? collected.first().mentions.roles.first() : message.guild.roles.cache.get(collected.first().content)
                            await bot.db.query(`SELECT * FROM bienvenue WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            const array = JSON.parse(req[0].bvnRole)
                            if(array.includes(role.id)) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌ ⁠${role} est déjà attribué aux nouveaux membres.**`)
                                await EmbedBienvenue(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            array.push(role.id)
                            await bot.db.query(`UPDATE bienvenue SET bvnRole = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Le rôle ${role} sera bien attribué aux nouveaux membres.**`)
                            await EmbedBienvenue(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un rôle.**`)
                            await EmbedBienvenue(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
        })
}

async function removerole(bot, message, msg, EmbedBienvenue, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Quel rôle voulez-vous retirer des rôles de bienvenue ?**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.roles.first() || message.guild.roles.cache.get(collected.first().content)) {
                            const role = collected.first().mentions.roles.first() ? collected.first().mentions.roles.first() : message.guild.roles.cache.get(collected.first().content)
                            await bot.db.query(`SELECT * FROM bienvenue WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            const array = JSON.parse(req[0].bvnRole)
                            if(!array.includes(role.id)) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌ ⁠${role} n'est pas attribué aux nouveaux membres.**`)
                                await EmbedBienvenue(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            array.splice(array.indexOf(role.id), 1)
                            await bot.db.query(`UPDATE bienvenue SET bvnRole = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ ${role} ne sera plus attribué aux nouveaux membres.**`)
                            await EmbedBienvenue(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un rôle.**`)
                            await EmbedBienvenue(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
                          })
}
module.exports = {
    Addrole: addrole,
    RemoveRole: removerole
};