const Discord = require('discord.js');
const whitelistFunction = require("../function/whitelist/wl")

module.exports = {
    name: 'whitelist',
    description: 'Gérer les membres dans la liste blanche de l\'anti-raid.',
    permission: "Aucune",
    dm: false,
    async run(bot, message, args) {
    const debut = Date.now();
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    const WhiteListUser = JSON.parse(req[0].whitelist)
    if(!(WhiteListUser.includes(message.user.id) || message.guild.ownerId === message.user.id)) {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`**❌ Vous devez être le propriétaire du serveur pour exécuter cette commande.**`)
        .setColor('Red')

        return message.reply({ embeds: [embed]})
    } else {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Liste blanche de l'anti-raid`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setDescription(`**:warning: Les membres dans la liste blanche sont ignorés par l'anti-raid et ont accès à l'ensemble des commandes réservées au propriétaire du serveur.**\nSeul le propriétaire du serveur peut ajouter/retirer des membres à la liste blanche.`)
        .addFields(
            { name: "Liste des membres dans la liste blanche :", value: `${WhiteListUser.length == 0 ? "> Aucun utilisateur n'est dans la liste blanche." : WhiteListUser.map(id => `> ${message.guild.members.cache?.get(id)} - ${message.guild.members.cache?.get(id).user.username}`).join("\n")}`}
        )
        .setTimestamp()
        .setFooter({ iconURL: message.user.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.user.username}` })

        const bouton1 = new Discord.ButtonBuilder()
        .setLabel('Ajouter')
        .setCustomId("addwhitelist")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setDisabled(message.guild.ownerId !== message.user.id && WhiteListUser.includes(message.user.id))
        const bouton2 = new Discord.ButtonBuilder()
        .setLabel("Retirer")
        .setCustomId("removewhitelist")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setDisabled(message.guild.ownerId !== message.user.id && WhiteListUser.includes(message.user.id))
        const bouton3 = new Discord.ButtonBuilder()
        .setLabel("Supprimer tous les membres")
        .setCustomId("suppralluser")
        .setStyle(Discord.ButtonStyle.Danger)
        .setDisabled(message.guild.ownerId !== message.user.id && WhiteListUser.includes(message.user.id))

        const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3);   

        const msg = await message.reply({ embeds: [embed], components: [row], fetchReply: true })

        const collector = msg.createMessageComponentCollector({});
        let filter2 = (m) => m.author.id === message.user.id
        collector.on("collect", async (interaction) => {
            const fin = Date.now();
            const embed2 = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
            if (interaction.user.id !== message.user.id || (fin - debut) / 1000 > 600) return interaction.reply({ embeds: [embed2], ephemeral: true })

            if(interaction.customId == "addwhitelist") {
                await disableComponents(interaction, msg)
                await whitelistFunction.addwhitelist(bot, message, msg, EmbedWhitelist, filter2)
            } else if(interaction.customId == "removewhitelist") {
                await disableComponents(interaction, msg)
                await whitelistFunction.removewhitelist(bot, message, msg, EmbedWhitelist, filter2)
            } else if(interaction.customId == "suppralluser") {
                await disableComponents(interaction, msg)
                await whitelistFunction.suppralluser(bot, message, msg, EmbedWhitelist, filter2)
            }
        })
    }
})

}}

async function EmbedWhitelist(bot, message, msg) {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    const WhiteListUser = JSON.parse(req[0].whitelist)
    const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Liste blanche de l'anti-raid`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setDescription(`**:warning: Les membres dans la liste blanche sont ignorés par l'anti-raid et ont accès à l'ensemble des commandes réservées au propriétaire du serveur.**\nSeul le propriétaire du serveur peut ajouter/retirer des membres à la liste blanche.`)
        .addFields(
            { name: "Liste des membres dans la liste blanche :", value: `${WhiteListUser.length == 0 ? "> Aucun utilisateur n'est dans la liste blanche." : WhiteListUser.map(id => `> ${message.guild.members.cache?.get(id)} - ${message.guild.members.cache?.get(id).user.username}`).join("\n")}`}
        )
        .setTimestamp()
        .setFooter({ iconURL: message.user.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.user.username}` })

        const bouton1 = new Discord.ButtonBuilder()
        .setLabel('Ajouter')
        .setCustomId("addwhitelist")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setDisabled(message.guild.ownerId !== message.user.id && WhiteListUser.includes(message.user.id))
        const bouton2 = new Discord.ButtonBuilder()
        .setLabel("Retirer")
        .setCustomId("removewhitelist")
        .setStyle(Discord.ButtonStyle.Secondary)
        .setDisabled(message.guild.ownerId !== message.user.id && WhiteListUser.includes(message.user.id))
        const bouton3 = new Discord.ButtonBuilder()
        .setLabel("Supprimer tous les membres")
        .setCustomId("suppralluser")
        .setStyle(Discord.ButtonStyle.Danger)
        .setDisabled(message.guild.ownerId !== message.user.id && WhiteListUser.includes(message.user.id))

        const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3);   

        await msg.edit({ embeds: [embed], components: [row] })
    })
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