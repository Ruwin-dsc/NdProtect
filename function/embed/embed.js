const Discord = require("discord.js")

async function embedManage(bot, message, msg, interaction, selectFunction, embed, embedModif, filter2) {
    if(interaction == "edittitle") {
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
                            await msg.edit({})
                        }
                    }).catch(e => {
                            msg2.delete()
        })
    }
}
module.exports = {
    embed: "s"
}