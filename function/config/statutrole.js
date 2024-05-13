const Discord = require("discord.js")

async function configrole(bot, message, msg, EmbedUtilitaire, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Quel rôle voulez-vous attribuer aux membres en fonction de leur statut ?\nVous pouvez taper \`remove\` pour supprimer le rôle configuré.**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(collected.first().mentions.roles.first() || message.guild.roles.cache.get(collected.first().content)) {
                            const role = collected.first().mentions.roles.first() ? collected.first().mentions.roles.first() : message.guild.roles.cache.get(collected.first().content)
                            await bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            if(req[0].rolestatut == role.id) {
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Red") 
                                .setDescription(`**❌ ⁠Le rôle ${role} est déjà configuré.**`)
                                await EmbedUtilitaire(bot, message, null, msg)  
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            await bot.db.query(`UPDATE utilitaire SET rolestatut = "${role.id}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Le rôle ${role} sera bien attribué aux personnes ayant le statut défini.**`)
                            await EmbedUtilitaire(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            }
                                })
                        } else if(collected.first().content == "remove") {
                            await bot.db.query(`UPDATE utilitaire SET rolestatut = "${null}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Rôle de statut supprimé avec succès.**`)
                            await EmbedUtilitaire(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        } 
                        else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez mentionner un rôle.**`)
                            await EmbedUtilitaire(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
        })
} 

async function configstatut(bot, message, msg, EmbedUtilitaire, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`**Quel statut voulez-vous configurer ?\nVous pouvez taper remove pour supprimer le statut configuré.**`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                            if(collected.first().content == "remove") {
                                await bot.db.query(`UPDATE utilitaire SET rolestatut = "${null}" WHERE guildId = ${message.guild.id}`);
                                const embed = new Discord.EmbedBuilder()
                                .setColor("Green") 
                                .setDescription(`**✅ Statut supprimé avec succès.**`)
                                await EmbedUtilitaire(bot, message, null, msg)   
                                message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            } else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Le statut doit faire moins de 128 caractères.**`)
                            if(collected.first().content > 128) return message.channel.send({ embeds: [embed] })
                            const texte = collected.first().content
                            await bot.db.query(`UPDATE utilitaire SET statut = "${texte}" WHERE guildId = ${message.guild.id}`);
                            await EmbedUtilitaire(bot, message, null, msg)   
                        }
                    }).catch(e => {
                            msg2.delete()
        })
} 
module.exports = {
    configRole: configrole,
    configStatut: configstatut
};