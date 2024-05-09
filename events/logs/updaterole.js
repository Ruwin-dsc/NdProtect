const Discord = require("discord.js");
const config = require('../../config.json')
const permissions = {
    "Administrator": "Administrateur",
    "ViewAuditLog" : "Voir les logs du serveur",
    "ViewGuildInsights" : "Voir le vue d'ensemble",
    "ManageGuild" : "Gérer le serveur",
    "ManageRoles" :  "Gérer les rôles",
    "ManageChannels" : "Gérer les canaux",
    "KickMembers" : "Kick des membres",
    "BanMembers" : "Ban des membres",
    "CreateInstantInvite" : "Créer des invitations",
    "ChangeNickname" : "Change Nickname",
    "ManageNicknames" : "Manage Nicknames",
    "ManageEmojisAndStickers" : "Gérer les émojis",
    "ManageWebhooks" :  "Gérer les Webhooks",
    "ViewChannel" : "Lire les salons de texte et voir les salons vocaux",
    "SendMessages" :  "Envoyer des messages",
    "SendTTSMessages" : "Envoyer des messages TTS",
    "ManageMessages" :"Gérer les messages",
    "EmbedLinks" : "Embed Links",
    "AttachFiles" : "Joindre des fichiers ",
    "ReadMessageHistory" : "Lire l'historique des messages",
    "MentionEveryone" : "Mentionner @everyone, @here, et tous les rôles",
    "UseExternalEmojis" : "Utiliser des émojis externes",
    "AddReactions" : "Ajouter des réactions",
    "Connect" : "Connecter",
    "Speak" : "Parler",
    "Stream" : "Vidéo",
    "MuteMembers" : "Mute des membres",
    "DeafenMembers" : "Rendre sourd les membres",
    "MoveMembers" : "Déplacer les membres",
    "UseVAD" : "Utiliser l'activité vocale",
    "PrioritySpeaker" : "Haut-parleur prioritaire",
    "SendPolls": "Envoyer des sondages"
}

module.exports = {
  name: "roleUpdate",
  async execute(oldChannel, newChannel, bot) {
    if(oldChannel.name == newChannel.name) return
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${newChannel.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setColor("Orange")
        .setTimestamp()
        .setTitle(`Modification d'un rôle`)
        .setDescription(`Rôle modifié : ${newChannel} \`${oldChannel.name}\`.`)
        .setFooter({ text: `ID du rôle : ${newChannel.id}` })
        
        if(oldChannel.name !== newChannel.name) {
            embed.addFields({ name: "Nom :", value: `> \`${oldChannel.name}\` ➔ \`${newChannel.name}\``})
        }
        if(oldChannel.color !== newChannel.color) {
            embed.addFields({ name: "Couleur :", value: `> ${oldChannel.color} ➔ ${newChannel.color}`})
        }
        if(oldChannel.hoist !== newChannel.hoist) {
            embed.addFields({ name: "Rôle affiché séparément :", value: `> ${oldChannel.hoist ? "Oui" : "Non"} ➔ ${newChannel.hoist ? "Oui" : "Non"}`})
        }
        if(oldChannel.mentionable !== newChannel.hoist) {
            embed.addFields({ name: "Rôle mentionnable :", value: `> ${oldChannel.mentionable ? "Oui" : "Non"} ➔ ${newChannel.mentionable ? "Oui" : "Non"}`})
        }
        if(oldChannel.mentionable !== newChannel.mentionable) {
            embed.addFields({ name: "Rôle mentionnable :", value: `> ${oldChannel.mentionable ? "Oui" : "Non"} ➔ ${newChannel.mentionable ? "Oui" : "Non"}`})
        }
        if(oldChannel.permissions !== newChannel.permissions) {
            const oldPermissions = oldChannel.permissions.toArray();
            const newPermissions = newChannel.permissions.toArray();

            const addPermission = newPermissions.filter(permission => !oldPermissions.includes(permission));
            const removedPermissions = oldPermissions.filter(permission => !newPermissions.includes(permission));
            if(addPermission.length !== 0) {
                const array = []
                for (const permission in permissions) {
                    if (addPermission.includes(permission)) array.push(`${permissions[permission]}`);
                }
                embed.addFields({ name: "Permissions ajoutées :", value: `> ${array.join(', ')}`})
            }
            if(removedPermissions.length !== 0) {
                const array = []
                for (const permission in permissions) {
                    if (removedPermissions.includes(permission)) array.push(`${permissions[permission]}`);
                }
                embed.addFields({ name: "Permissions retirées :", value: `> ${array.join(', ')}`})
            }
        }
        const channel2 = newChannel.guild.channels.cache.get(req[0].channelGuild)
        if(channel2) channel2.send({ embeds: [embed]})
    })
}}