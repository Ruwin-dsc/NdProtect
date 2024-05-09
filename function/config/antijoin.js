const Discord = require("discord.js")

async function editTime(bot, message, msg, EmbedAuto, filter2) {
    const embed = new Discord.EmbedBuilder()
            .setDescription(`****Combien de membres maximum voulez-vous autoriser à rejoindre le serveur sur les 10 dernières secondes ?****`)
            .setColor("White")    
                    const msg2 = await message.channel.send({ embeds: [embed] })
                    let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
                    .then(async (collected) => {
                        if(parseInt(collected.first().content) <= 100 || parseInt(collected.first().content) >= 2) {
                            await bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            msg2.delete(), collected.first().delete()
                            await bot.db.query(`UPDATE antiraid SET antijoinlimite = "${collected.first().content}" WHERE guildId = ${message.guild.id}`);
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Green") 
                            .setDescription(`**✅ Le mode raid automatique se déclenchera si plus de ${collected.first().content} personnes rejoignent le serveur en 10 secondes.**`)
                            await EmbedAuto(bot, message, null, msg)   
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                            
                                })
                        } else {
                            msg2.delete(), collected.first().delete()
                            const embed = new Discord.EmbedBuilder()
                            .setColor("Red") 
                            .setDescription(`**❌ Vous devez saisir un nombre compris entre 2 et 100.**`)
                            await EmbedAuto(bot, message, null, msg)  
                            message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                        }
                    }).catch(e => {
                            msg2.delete()
                          })
}

module.exports = {
    editLimit: editTime,
};