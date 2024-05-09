const Discord = require("discord.js")

async function AddWhitelist(bot, message, msg, EmbedWhitelist, filter2) {
    const embed = new Discord.EmbedBuilder()
    .setDescription(`**Qui voulez-vous ajouter à la liste blanche ?**`)
    .setColor("White")    
            const msg2 = await message.channel.send({ embeds: [embed] })
            let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
            .then(async (collected) => {
                if(collected.first().mentions.users.first() || message.guild.members.cache.get(collected.first().content)) {
                    const user = collected.first().mentions.users.first() ? collected.first().mentions.users.first() : message.guild.members.cache.get(collected.first().content)
                    await bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    msg2.delete(), collected.first().delete()
                    const array = JSON.parse(req[0].whitelist)
                    if(array.includes(user.id)) {
                        const embed = new Discord.EmbedBuilder()
                        .setColor("Red") 
                        .setDescription(`**❌ ${user} est déjà dans la liste blanche de l'anti-raid.**`)
                        await EmbedWhitelist(bot, message, msg)  
                        message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                    } else {
                    array.push(user.id)
                    await bot.db.query(`UPDATE bot SET whitelist = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE guildId = ${message.guild.id}`);
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Green") 
                    .setDescription(`**✅ ${user} a bien été ajouté à la liste blanche de l'anti-raid.**`)
                    await EmbedWhitelist(bot, message, msg)   
                    message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                    const whitelist = JSON.parse(req[0].whitelist)
                    whitelist.push(message.guild.ownerId)
                    bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                        if(req.length < 1) return
                        const embedLogs = new Discord.EmbedBuilder()
                        .setTitle(`Ajout d'un membre à la liste blanche de l'anti-raid`)
                        .setDescription(`${user} a été ajouté à la liste blanche de l'anti-raid.`)
                        .addFields({ name: "Auteur :", value: `> ${message.user} **@${message.user.username}**`})
                        .setFooter({ text: `ID de l'utilisateur: ${user.id} `})
                        .setAuthor({ name: `@${message.guild.members.cache.get(user.id).user.username}`, iconURL: message.guild.members.cache.get(user.id).displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv"})
                        .setTimestamp()
                        .setThumbnail(message.guild.members.cache.get(user.id).displayAvatarURL({ dynamic: true }))
                        .setColor("Green")
                        const channel = message.guild.channels.cache.get(req[0].channelAntiraid)
                        if(channel) channel.send({ embeds: [embedLogs], content: `${whitelist.map(w => `<@${w}>`).join(", ")}`})
                    })
                    }
                        })
                } else {
                    msg2.delete(), collected.first().delete()
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Red") 
                    .setDescription(`**❌ Cet utilisateur n'existe pas ou n'est pas membre du serveur.**`)
                    await EmbedWhitelist(bot, message, msg)  
                    message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                }
            }).catch(e => {
                    msg2.delete()
                  })
}

async function RemoveWhitelist(bot, message, msg, EmbedWhitelist, filter2) {
    const embed = new Discord.EmbedBuilder()
    .setDescription(`**Qui voulez-vous retirer de la liste blanche de l'anti-raid ?**`)
    .setColor("White")    
            const msg2 = await message.channel.send({ embeds: [embed] })
            let collected = await message.channel.awaitMessages({ filter: filter2, max: 1, time: 30000, errors: ["time"]})
            .then(async (collected) => {
                if(collected.first().mentions.users.first() || message.guild.members.cache.get(collected.first().content)) {
                    const user = collected.first().mentions.users.first() ? collected.first().mentions.users.first() : message.guild.members.cache.get(collected.first().content)
                    await bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    msg2.delete(), collected.first().delete()
                    const array = JSON.parse(req[0].whitelist)
                    if(!array.includes(user.id)) {
                        const embed = new Discord.EmbedBuilder()
                        .setColor("Red") 
                        .setDescription(`**❌ ${user} n'est pas dans la liste blanche de l'anti-raid.**`)
                        await EmbedWhitelist(bot, message, msg)  
                        message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                    } else {
                    array.splice(array.indexOf(user.id), 1)
                    await bot.db.query(`UPDATE bot SET whitelist = "${JSON.stringify(array).replace(/"/g, '\\"')}" WHERE guildId = ${message.guild.id}`);
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Green") 
                    .setDescription(`**✅ ${user} a bien été retiré à la liste blanche de l'anti-raid.**`)
                    await EmbedWhitelist(bot, message, msg)   
                    message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                    array.push(message.guild.ownerId)
                    bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                        if(req.length < 1) return
                        const embedLogs = new Discord.EmbedBuilder()
                        .setTitle(`Retrait d'un membre à la liste blanche de l'anti-raid`)
                        .setDescription(`${user} a été retiré à la liste blanche de l'anti-raid.`)
                        .addFields({ name: "Auteur :", value: `> ${message.user} **@${message.user.username}**`})
                        .setFooter({ text: `ID de l'utilisateur: ${user.id} `})
                        .setAuthor({ name: `@${message.guild.members.cache.get(user.id).user.username}`, iconURL: message.guild.members.cache.get(user.id).displayAvatarURL({ dynamic: true }), url: "https://discord.gg/3PA53mfwSv"})
                        .setTimestamp()
                        .setThumbnail(message.guild.members.cache.get(user.id).displayAvatarURL({ dynamic: true }))
                        .setColor("Red")
                        const channel = message.guild.channels.cache.get(req[0].channelAntiraid)
                        if(channel) channel.send({ embeds: [embedLogs], content: `${array.map(w => `<@${w}>`).join(", ")}`})
                    })
                    }
                        })
                } else {
                    msg2.delete(), collected.first().delete()
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Red") 
                    .setDescription(`**❌ Cet utilisateur n'existe pas ou n'est pas membre du serveur.**`)
                    await EmbedWhitelist(bot, message, msg)  
                    message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => { m.delete() }, 5000))
                }
            }).catch(e => {
                    msg2.delete()
                  })
}

async function SupprAllUser(bot, message, msg, EmbedWhitelist, filter2) {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const WhiteListUser = JSON.parse(req[0].whitelist)
        if(WhiteListUser.length == 0) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ La liste blanche de l'anti-raid est déjà vide.**`)
            return message.channel.send({ embeds: [embed]}).then(m => setTimeout(() => { m.delete() }, 5000))
        } else {
            const embed = new Discord.EmbedBuilder()
            .setColor("White")
            .setDescription(`**Êtes-vous sûr de vouloir vider la liste blanche de l'anti-raid ?**`)

            const bouton1 = new Discord.ButtonBuilder()
            .setLabel('Supprimer tous les membres')
            .setCustomId("deletemembers")
            .setStyle(Discord.ButtonStyle.Success)
            const bouton2 = new Discord.ButtonBuilder()
            .setLabel("Annuler")
            .setCustomId("return")
            .setStyle(Discord.ButtonStyle.Secondary)

            const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2);   

            const msg2 = await message.channel.send({ embeds: [embed], components: [row] })
            const collector = msg2.createMessageComponentCollector({ time: 10000 });

            collector.on("collect", async (interaction) => {
                const embed2 = new Discord.EmbedBuilder()
                .setColor('Red')
                .setDescription(`**❌ Vous n'avez pas les permissions d'utiliser ce menu.**`)
                if (interaction.user.id !== message.user.id) return interaction.reply({ embeds: [embed2], ephemeral: true })

                if(interaction.customId == "deletemembers") {
                const embed2 = new Discord.EmbedBuilder()
                .setColor('Green')
                .setDescription(`**✅ La liste blanche de l'anti-raid a bien été vidée.**`)
                await bot.db.query(`UPDATE bot SET whitelist = "[]" WHERE guildId = ${message.guild.id}`);
                await interaction.reply({ embeds: [embed2]})
                await msg2.delete()
                await EmbedWhitelist(bot, message, msg) 
                const whitelist = JSON.parse(req[0].whitelist)
                    bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                        if(req.length < 1) return
                        const nowhitelistMap = whitelist.map((m) => `> <@${m}> **${(message.guild.members.cache.get(m).user.username)}**\n`)
                        const embedLogs = new Discord.EmbedBuilder()
                        .setTitle(`Vidage de la liste blanche de l'anti-raid`)
                        .addFields({ name: "Auteur :", value: `> ${message.user} **@${message.user.username}**`}, { name: "Membres retirés :", value: `${nowhitelistMap}`})
                        .setFooter({ text: `ID du serveur : ${message.guild.id} `})
                        .setTimestamp()
                        .setThumbnail(message.guild.iconURL({ dynamic: true }))
                        .setColor("Red")
                        const channel = message.guild.channels.cache.get(req[0].channelAntiraid)
                        if(channel) channel.send({ embeds: [embedLogs], content: `<@${message.guild.ownerId}>`})
                    })
                } else if(interaction.customId == "return") {
                const embed2 = new Discord.EmbedBuilder()
                .setColor('Red')
                .setDescription(`**❌ Vidage de la liste blanche de l'anti-raid annulé.**`)

                await interaction.channel.send({ embeds: [embed2]})
                await msg2.delete()
                await EmbedWhitelist(bot, message, msg) 
                }
            }) 

            collector.on("end", async () => {
                msg2.delete()
                await EmbedWhitelist(bot, message, msg) 
            })

        }
    })
}
module.exports = {
    addwhitelist: AddWhitelist,
    removewhitelist: RemoveWhitelist,
    suppralluser: SupprAllUser
}