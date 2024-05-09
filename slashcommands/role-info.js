const Discord = require("discord.js")

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
    name: 'role-info',
    description: 'Afficher les informations d\'un rôle.',
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "role",
            name: "role",
            description: "Rôle dont vous voulez obtenir des informations.",
            required: true,
            autocomplete: false,
        },
    ],
    async run(bot, message, args) {
        const role = args.getRole("role")
        const rolePermissions = role.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (rolePermissions.includes(permission)) finalPermissions.push(permissions[permission]);
        }
        const embed = new Discord.EmbedBuilder()
            .setTitle(role.name)
            .addFields(
                { name: "**📚・Informations sur le rôle :**\n", value: `> **ID :** ${role.id}\n> **Nom :** \`${role.name}\`\n> **Date de création :** <t:${parseInt(role.createdAt / 1000)}:R> (<t:${parseInt(role.createdAt / 1000)}:f>)\n> **Couleur :** ${role.color}\n> **Position :** ${role.position}/${message.guild.roles.cache.size}\n> **Affiché séparément :** ${role.hoist ? "Oui" : "Non"}\n> **Mentionnable :** ${role.mentionable ? "Oui" : "Non"}` },
                { name: "**🔧・Informations avancées :**\n", value: `> **Administrateur : ** ${role.permissions.toArray().includes("Administrator") ? "🛠️ Oui" : "Non"}\n> **Membres ayant ce rôle :** ${role.members.size || "0"}\n> **Rôle d'intégration :** ${role.managed ? "Oui" : "Non"}\n> **Rôle booster :** ${role.managed ? "Oui" : "Non"}\n> **Permissions :** ${finalPermissions.length !== 0 ? finalPermissions.join(', ') : "Aucune"}` }
            )
            .setColor('White')
            .setAuthor({ name: `Informations sur le rôle`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            .setFooter({ iconURL: message.user.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.user.username}` })

        message.reply({ embeds: [embed] })
    }
}

function time(timeString) {
    if (timeString < 60) {
        return timeString + "s";
    } else if (timeString < 3600) {
        const minutes = Math.floor(timeString / 60);
        return minutes + "m";
    } else if (timeString < 86400) {
        const heures = Math.floor(timeString / 3600);
        return heures + "h";
    } else {
        const jours = Math.floor(timeString / 86400);
        return jours + "d";
    }
}