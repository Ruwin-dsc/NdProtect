const Discord = require("discord.js")

exports.help = {
    name: "ban-list",
    category: 'utilitaire',
    description: "Afficher la liste des utilisateurs bannis du serveur.",
    aliases: ["banlist"]
  };
  
exports.run = async (bot, message, args) => { 
    const debut = Date.now();
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Bannir des membres.**`)

        return message.reply({ embeds: [embed] })
      } else {
        const bans = await message.guild.bans.fetch();
        const array = []
        const banMap = bans.map(async (m, i) => await array.push({ name: `\`${m.user.bot ? m.user.tag : m.user.username}\``, value: `> **ID :** ${m.user.id}\n> **Raison :** ${m.reason ? m.reason : "Aucune raison fournie"}` }))
        const itemsPerPage = 10;
        const totalPages = Math.ceil(array.length / itemsPerPage);
        let page = 1;
        
        const noBanEmbed = new Discord.EmbedBuilder()
        .setColor("Blue")
        .setDescription(`**ℹ️ Aucun utilisateur n'est banni du serveur**`)
        if(banMap.length == 0) return message.reply({ embeds: [noBanEmbed]})
        const generateEmbed = (page) => {
            const start = (page - 1) * itemsPerPage;
            const end = page * itemsPerPage;
            const currentBans = array.slice(start, end);
            currentBans.sort((a, b) => (a.name > b.name) ? 1 : -1);
    
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `Liste des bannissements du serveur`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
            .setColor("White")
            .setTimestamp()
            .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            currentBans.forEach(m => embed.addFields({ name: m.name, value: m.value}))
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

        const row = new Discord.ActionRowBuilder().addComponents(botton1.setDisabled(true), botton3, botton2.setDisabled(totalPages == 1)) 
        const msg = await message.reply({ embeds: [generateEmbed(page)], components: [row] })

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
            }
        })
      }
}
