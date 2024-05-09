const Discord = require("discord.js")
const embedFunction = require("../../function/embed/embed")
exports.help = {
    name: "embed",
    category: 'utilitaire',
    description: "Construire et envoyer un embed avec le bot."
  };
  
exports.run = async (bot, message, args) => { 
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les salons.**`)

        return message.reply({ embeds: [embed] })
    } else {
        return message.reply(":x: Non disponible !, || Je peux vous la refaire pour 3€ PayPal ! https://paypal.me/whitehallv2 https://discord.gg/uhq")
        // const embed = new Discord.EmbedBuilder()
        // .setAuthor({ name: `Construction d'un embed`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        // .setColor("White")
        // .setTimestamp()
        // .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })
        // .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        // .setDescription(`**À tout moment vous pouvez taper :**\n> \`remove\` pour supprimer le paramètre sélectionné\n> \`cancel\` pour annuler votre modification`)

        // let embedModif = new Discord.EmbedBuilder()
        // .setDescription(`Description par défaut`)
        // const bouton1 = new Discord.ButtonBuilder()
        // .setLabel('Envoyer l\'embed')
        // .setCustomId("sendEmbed")
        // .setStyle(Discord.ButtonStyle.Success)
        // const row = new Discord.ActionRowBuilder().addComponents(bouton1);  
        // const msg = await message.reply({ embeds: [embed, embedModif], components: [selectFunction(), row] })

        // const collector = msg.createMessageComponentCollector({});
        // let filter2 = (m) => m.author.id === message.author.id

        // collector.on("collect", async (interaction) => {
        //     const embed2 = new Discord.EmbedBuilder()
        //     .setColor('Red')
        //     .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
        //     if (interaction.user.id !== message.author.id ) return interaction.reply({ embeds: [embed2], ephemeral: true })

        //     if(interaction.customId == "select") {
        //         await disableComponents(interaction, msg)
        //         await embedFunction.embed(bot, message, msg, interaction.values[0], selectFunction(interaction.values[0]), embed, embedModif, filter2)
        //     }
        // })
    }
}   

function selectFunction(option) {
    const select = new Discord.StringSelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder("Que voulez-vous modifier ?")
        .setDisabled(false)
        .addOptions(
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Modifier le titre')
                .setValue('edittitle')
                .setDefault(option == "edittitle")
                .setEmoji("✏️"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Modifier la description ')
                .setValue('editdescription')
                .setDefault(option == "editdescription")
                .setEmoji("💬"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Modifier l\'auteur')
                .setValue('editauthor')
                .setDefault(option == "editauthor")
                .setEmoji("👥"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Modifier le pied de page')
                .setValue('editfooter')
                .setDefault(option == "editfooter")
                .setEmoji("🔻"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Modifier l\'icône')
                .setValue('editthumbnail')
                .setDefault(option == "editthumbnail")
                .setEmoji("🖼️"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Modifier l\'image')
                .setValue('editimage')
                .setDefault(option == "editimage")
                .setEmoji("🌄"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Modifier la couleur')
                .setValue('editcolor')
                .setDefault(option == "editcolor")
                .setEmoji("🎨"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Activer/desactiver la date')
                .setValue('edittimestamp')
                .setDefault(option == "edittimestamp")
                .setEmoji("⏰"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Ajouter un champ')
                .setValue('addfield')
                .setDefault(option == "addfield")
                .setEmoji("➕"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Supprimer un champ')
                .setValue('removefield')
                .setDefault(option == "removefield")
                .setEmoji("➖"),
        );
    const row = new Discord.ActionRowBuilder().addComponents(select);

    return row
}

async function disableComponents(interaction, msg) {
    if (msg.components) {
        msg.components.forEach((row) => {
            row.components.forEach((component) => {
                component.data.disabled = true
            })
        })
        await interaction.update({ components: msg.components })
    }
}