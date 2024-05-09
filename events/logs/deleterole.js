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
  name: "roleDelete",
  async execute(role, bot) {
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${role.guild.id}"`, async (err, req) => {
        const rolePermissions = role.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (rolePermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
        }

        const embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTimestamp()
        .setTitle(`Suppression d'un rôle`)
        .setDescription(`Rôle supprimé : \`${role.name}\`.`)
        .addFields(
            { name: "Rôle affiché séparément :", value: `> ${role.hoist ? "Oui" : "Non"}`},
            { name: "Rôle mentionnable :", value: `> ${role.mentionable ? "Oui" : "Non"}`},
            { name: "Permissions :", value: `> ${finalPermissions.length !== 0 ? finalPermissions.join(', ') : "Aucune"}`},
        )
        .setFooter({ text: `ID du rôle : ${role.id}` })
        const channel2 = role.guild.channels.cache.get(req[0].channelGuild)
        if(channel2) channel2.send({ embeds: [embed]})
    })
}}