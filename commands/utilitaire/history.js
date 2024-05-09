const Discord = require("discord.js")

exports.help = {
    name: "history",
    category: 'utilitaire',
    description: "Afficher l'historique d'un utilisateur.",
    aliases: ["prevname", "prevnames"]
  };
  
exports.run = async (bot, message, args) => { 
    let user;
    if(!args[0]) user = message.member
    else user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!user) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription("**❌ Cet utilisateur n'existe pas.**")
        return message.reply({ embeds: [embed]})
    } else {
        user = message.guild.members.cache.get(user.id)
        bot.db.query(`SELECT * FROM prevname WHERE userId = "${user.id}"`, async (err, req) => {
            if(req.length < 1 || req[0].prevname == "[]") {
                let timestamp;
                if(req.length < 1) timestamp = { timestamp: Math.floor(Date.now() / 1000), name: user.user.username}, bot.db.query(`INSERT INTO prevname (userId, timestamp) VALUES ("${user.id}", "${JSON.stringify({ timestamp: Math.floor(Date.now() / 1000), name: user.user.username}).replace(/"/g, '\\"')}")`)
                else timestamp = JSON.parse(req[0].timestamp)
                const embed = new Discord.EmbedBuilder()
                .setColor("White")
                .setAuthor({ name: `Historique de l'utilisateur`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                .setTimestamp()
                .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: `<t:${parseInt(user.user.createdTimestamp / 1000)}:f>`, value: "> 👋 Création du compte Discord." },
                    { name: `<t:${timestamp.timestamp}:f>`, value: `> ℹ️ Premier enregistrement en base de données.\n> **Nouveau nom d'utilisateur : @${timestamp.name}**` }
                )
                const botton1 = new Discord.ButtonBuilder()
                .setEmoji("⬅️")
                .setCustomId('leftpage')
                .setStyle(Discord.ButtonStyle.Primary)
        
                const botton2 = new Discord.ButtonBuilder()
                .setEmoji("➡️")
                .setCustomId('rightpage')
                .setStyle(Discord.ButtonStyle.Primary)
        
                const botton3 = new Discord.ButtonBuilder()
                .setLabel(`1/1`)
                .setCustomId('nbpage')
                .setStyle(Discord.ButtonStyle.Secondary)
                .setDisabled(true)

                const botton4 = new Discord.ButtonBuilder()
                .setLabel(`Vider l'historique`)
                .setCustomId('deleteprevname')
                .setStyle(Discord.ButtonStyle.Danger)
                .setDisabled(true)
        
                const row = new Discord.ActionRowBuilder().addComponents(botton1.setDisabled(true), botton3, botton2.setDisabled(true), botton4.setDisabled(true)) 
                return message.reply({ embeds: [embed], components: [row]})
            } else {
                let timestamp = JSON.parse(req[0].timestamp)
                const prevname = JSON.parse(req[0].prevename)
                const itemsPerPage = 10;
                const totalPages = Math.ceil(array.length / itemsPerPage);
                let page = 1;
        

                const generateEmbed = (page) => {
                    const start = (page - 1) * itemsPerPage;
                    const end = page * itemsPerPage;
                    const currentPrevname = prevname.slice(start, end);
                    currentPrevname.sort((a, b) => (a.name > b.name) ? 1 : -1);
            
                    const embed = new Discord.EmbedBuilder()
                    .setColor("White")
                    .setAuthor({ name: `Historique de l'utilisateur`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()
                    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        { name: `<t:${parseInt(user.user.createdTimestamp / 1000)}:f>`, value: "> 👋 Création du compte Discord." },
                        { name: `<t:${timestamp.timestamp}:f>`, value: `> ℹ️ Premier enregistrement en base de données.\n> **Nouveau nom d'utilisateur : @${timestamp.name}**` }
                    )
                    currentPrevname.forEach(m => embed.addFields({ name: `<t:${m.timestamp}:f>`, value: `> **Nouveau nom d'utilisateur : @${m.pseudo}**`}))
                    return embed;
                };

                const botton1 = new Discord.ButtonBuilder()
                .setEmoji("⬅️")
                .setCustomId('leftpage')
                .setStyle(Discord.ButtonStyle.Primary)
        
                const botton2 = new Discord.ButtonBuilder()
                .setEmoji("➡️")
                .setCustomId('rightpage')
                .setStyle(Discord.ButtonStyle.Primary)
        
                const botton3 = new Discord.ButtonBuilder()
                .setLabel(`${page}/${totalPages}`)
                .setCustomId('nbpage')
                .setStyle(Discord.ButtonStyle.Secondary)
                .setDisabled(true)

                const botton4 = new Discord.ButtonBuilder()
                .setLabel(`Vider l'historique`)
                .setCustomId('deleteprevname')
                .setStyle(Discord.ButtonStyle.Danger)
                .setDisabled(message.author.id !== user.id)
        
                const row = new Discord.ActionRowBuilder().addComponents(botton1.setDisabled(true), botton3, botton2.setDisabled(totalPages == 1), botton4) 
                const msg = await message.reply({ embeds: [generateEmbed(page)], components: [row]})

                const collector = msg.createMessageComponentCollector();

                collector.on("collect", async (interaction) => {
                    const fin = Date.now();
                    const embed2 = new Discord.EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
                    if (interaction.user.id !== message.author.id) return interaction.reply({ embeds: [embed2], ephemeral: true })
        
                    if(interaction.customId == "leftpage") {
                        if (page > 1) {
                        page--;
            
                        const botton3 = new Discord.ButtonBuilder()
                        .setLabel(`${page}/${totalPages}`)
                        .setCustomId('nbpage')
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
            
                        const row = new Discord.ActionRowBuilder().addComponents(botton1.setDisabled(page == 1), botton3, botton2.setDisabled(totalPages == page)) 
            
                        await interaction.update({embeds: [generateEmbed(page)], components: [row] });
                        }
                    } else if(interaction.customId == "rightpage") {
                        if (page < totalPages) {
                        page++;
            
                        const botton3 = new Discord.ButtonBuilder()
                        .setLabel(`${page}/${totalPages}`)
                        .setCustomId('nbpage')
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)
            
                        const row = new Discord.ActionRowBuilder().addComponents(botton1.setDisabled(page == 1), botton3, botton2.setDisabled(totalPages == page)) 
            
                        await interaction.update({embeds: [generateEmbed(page)], components: [row] });
                        }
                    } else if(interaction.customId == "deleteprevname") {
                        await bot.db.query( `DELETE FROM prevname WHERE userId = '${message.author.id}'`);

                        timestamp = { timestamp: Math.floor(Date.now() / 1000), name: user.user.username}, bot.db.query(`INSERT INTO prevname (userId, timestamp) VALUES ("${user.id}", "${JSON.stringify({ timestamp: Math.floor(Date.now() / 1000), name: user.user.username}).replace(/"/g, '\\"')}")`)
                        const embed = new Discord.EmbedBuilder()
                        .setColor("White")
                        .setAuthor({ name: `Historique de l'utilisateur`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                        .setTimestamp()
                        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })
                        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                        .addFields(
                            { name: `<t:${parseInt(user.user.createdTimestamp / 1000)}:f>`, value: "> 👋 Création du compte Discord." },
                            { name: `<t:${timestamp.timestamp}:f>`, value: `> ℹ️ Premier enregistrement en base de données.\n> **Nouveau nom d'utilisateur : @${timestamp.name}**` }
                        )
                        const botton1 = new Discord.ButtonBuilder()
                        .setEmoji("⬅️")
                        .setCustomId('leftpage')
                        .setStyle(Discord.ButtonStyle.Primary)
                
                        const botton2 = new Discord.ButtonBuilder()
                        .setEmoji("➡️")
                        .setCustomId('rightpage')
                        .setStyle(Discord.ButtonStyle.Primary)
                
                        const botton3 = new Discord.ButtonBuilder()
                        .setLabel(`1/1`)
                        .setCustomId('nbpage')
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setDisabled(true)

                        const botton4 = new Discord.ButtonBuilder()
                        .setLabel(`Vider l'historique`)
                        .setCustomId('deleteprevname')
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setDisabled(message.author.id !== user.id)
                
                        const row = new Discord.ActionRowBuilder().addComponents(botton1.setDisabled(true), botton3, botton2.setDisabled(true), botton4.setDisabled(true)) 
                        await interaction.update({ embeds: [embed], components: [row]})
                    }
                })
              
            }
        })
    }
}