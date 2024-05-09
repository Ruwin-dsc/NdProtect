const Discord = require("discord.js")

module.exports = {
    name: 'clear-user',
    description: 'Supprimer les messages d\'un utilisateur sur l\'ensemble du serveur.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "user",
          name: "user_to_clear",
          description: "Utilisateur dont vous souhaitez supprimer les messages.",
          required: true,
          autocomplete: false,
        },
      ],
    async run(bot, message, args) {
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages) || !message.member.permissions.has(Discord.PermissionsBitField.Flags.MuteMembers) ) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les messages, Exclure temporairement des membres.**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            const embedError = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setDescription(`**❌ Vous devez mentionner un utilisateur.**`);
            const user = args.getUser("user_to_clear")
    
            if (!user) {
                return message.reply({ embeds: [embedError.setDescription(`**❌ Cet utilisateur n'existe pas.**`)] });
            }
        
            if (user.id === message.user.id) {
                const embed = new Discord.EmbedBuilder()
                    .setColor("#FF0000")
                    .setDescription("❌ **Vous ne pouvez pas supprimer vos propres messages.**");
                return message.reply({ embeds: [embed], ephemeral: false });
            }
        
            const confirmationEmbed = new Discord.EmbedBuilder()
                .setColor("White")
                .setAuthor({ name: 'Suppression des messages de l\'utilisateur', iconURL: bot.user.displayAvatarURL(), url: "https://discord.gg/AcJw5Jwyan" })
                .setDescription(`Êtes-vous sûr de vouloir supprimer tous les messages de ${user} ?`)
                .setFooter({ iconURL: message.user.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.user.username}` })
        
            const confirmButton = new Discord.ButtonBuilder()
                .setCustomId('confirm_button')
                .setLabel('Confirmer')
                .setStyle(1);
        
            const cancelButton = new Discord.ButtonBuilder()
                .setCustomId('cancel_button')
                .setLabel('Annuler')
                .setStyle(2);
        
            const row = new Discord.ActionRowBuilder()
                .addComponents(confirmButton, cancelButton);
        
            const msg = await message.reply({ embeds: [confirmationEmbed], components: [row], fetchReply: true })
                const filter = i => i.user.id === message.user.id;
                const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
        
                collector.on('collect', async i => {
                    if (i.customId === 'confirm_button') {
                        msg.components.forEach((row) => {
                            row.components.forEach((component) => {
                                component.data.disabled = true
                            })
                        })
                        await interaction.update({ components: msg.components })
                        const inProgressEmbed = new Discord.EmbedBuilder()
                            .setColor("Blue")
                            .setDescription("**ℹ️ Suppression des messages en cours...**");
                        await i.reply({ embeds: [inProgressEmbed] });
        
                        const channels = await message.guild.channels.cache;
                        if (!channels) return;
        
                        await channels.forEach(async channelo => {
                            const channel = message.guild.channels.cache.get(channelo.id)
                            if(channel.type !== Discord.ChannelType.GuildText) return
    
                            const msgFetch = await channel.messages.fetch({
                                limit: 100,
                                before: message.id,
                            });
                            if (!msgFetch) return;
        
                            const userMessages = msgFetch.filter(msg => msg.author.id === user.id);
                            await channel.bulkDelete(userMessages, true);
                        });
        
                        const successEmbed = new Discord.EmbedBuilder()
                            .setColor("Green")
                            .setDescription(`**✅ Suppression des messages de ${user} effectuée avec succès.**`);
                        await message.channel.send({ embeds: [successEmbed] });
                    } else if (i.customId === 'cancel_button') {
                        msg.components.forEach((row) => {
                            row.components.forEach((component) => {
                                component.data.disabled = true
                            })
                        })
                        await i.update({ components: msg.components })
                        const cancelledEmbed = new Discord.EmbedBuilder()
                            .setColor("#FF0000")
                            .setDescription("**❌ Suppression des messages annulée.**");
                        await i.channel.send({ embeds: [cancelledEmbed] });
                    }
                });    
        }
    }
}