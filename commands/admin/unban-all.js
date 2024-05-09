const Discord = require("discord.js");

exports.help = {
    name: "unban-all",
    category: 'admin',
    aliases: ["unbanall"]
};

exports.run = async (bot, message, args) => {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const whitelist = JSON.parse(req[0].whitelist)
    
        if(message.author.id !== message.guild.ownerId && !whitelist.includes(message.author.id)) {
            const embedError = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Je n'ai pas la permission de retirer les bannissements.**`);
    
            return message.reply({ embeds: [embedError] });
        }

        const bans = await message.guild.bans.fetch();
        if(bans.size == 0) {
            const embedError = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Aucun bannissement trouvé sur ce serveur.**`);
    
            return message.reply({ embeds: [embedError] });
        }

        const embed = new Discord.EmbedBuilder()
        .setColor("White")
        .setAuthor({ name: 'Révocation de tous les bannissements', url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true })})
        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}`})
        .setTimestamp()
        .setDescription(`Êtes vous sûr de vouloir révoquer tous les bannissements ?`)

        const bouton1 = new Discord.ButtonBuilder()
        .setLabel("Confirmer")
        .setCustomId("confirm")
        .setStyle(Discord.ButtonStyle.Success)
        const bouton2 = new Discord.ButtonBuilder()
        .setLabel("Annuler")
        .setCustomId("stop")
        .setStyle(Discord.ButtonStyle.Secondary)

        const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2);   

        const msg = await message.reply({ embeds: [embed], components: [row]})
        const collector = msg.createMessageComponentCollector({});

        collector.on("collect", async (interaction) => {
            const embed2 = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
            if(interaction.user.id !== message.author.id) return interaction.reply({ embeds: [embed2], ephemeral: true })
            if(interaction.customId == "confirm") {
                msg.components.forEach((row) => {
                    row.components.forEach((component) => {
                        component.data.disabled = true
                    })
                })
                await interaction.update({ components: msg.components })

                const embed = new Discord.EmbedBuilder()
                .setDescription(`**ℹ️ Révocation des bannissements en cours...**`)
                .setColor("Blue")
                await message.channel.send({ embeds: [embed]})
                await bans.forEach(async (user) => {
                    await message.guild.bans.remove(user.user.id);
                });
                const embed2 = new Discord.EmbedBuilder()
                .setDescription(`**✅ Révocation des bannissements effectuée avec succès.**`)
                .setColor("Green")
                await message.channel.send({ embeds: [embed2]})

            } else {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription("**❌ Révocation des bannissements annulée.**")
                msg.components.forEach((row) => {
                    row.components.forEach((component) => {
                        component.data.disabled = true
                    })
                })
                await interaction.update({ components: msg.components })
                return message.reply({ embeds: [embed]})
            }
        })

    })
}