const Discord = require("discord.js")

const antispamFunction = require("../../function/config/antispam")
const antilinkFunction = require("../../function/config/antilink")
const antiinviteFunction = require("../../function/config/antiinvite")
const antijoinFunction = require("../../function/config/antijoin")
const bvnFunction = require("../../function/config/bvn")
const greetFunction = require("../../function/config/greet")
const badgeRoleFunction = require("../../function/config/badgerole")
const statutroleFunction = require("../../function/config/statutrole")
const channelBoostFunction = require("../../function/config/configboost")
const logsFunction = require("../../function/config/logs")

exports.help = {
    name: "config",
    category: 'admin',
    description: "Configurer les fonctionnalités du bot.",
    aliases: ["conf"]
};

exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Administrateur.**`)

        return message.reply({ embeds: [embed] })
      }
    const debut = Date.now();
    const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Configuration de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            {
                name: `**⚔️・Anti-raid**\n`,
                value: `Configuration des systèmes de protection anti-raid : bots, webhooks, membres, salons, rôles, identité et permissions du serveur.`
            },
            {
                name: `**🧨・Anti-spam et auto-raidmode**\n`,
                value: `Configuration de l'anti-spam et du mode raid automatique.`
            },
            {
                name: `**🛠️・Auto-modération**\n`,
                value: `Configuration de la modération automatique : anti liens et anti invitations.`
            },
            {
                name: `**👋・Actions de bienvenue**\n`,
                value: `Configuration des actions du bot lorsqu'un membre rejoint le serveur : ghost ping et rôles de bienvenue.`
            },
            {
                name: `**🔧・Utilitaire**\n`,
                value: `Configuration des rôles selon les badges Discord, du rôle statut et des notifications de Boost.`
            },
            {
                name: `**🧾・Logs du serveur**\n`,
                value: `Configuration des salons de logs utilisés par le bot.`
            }
        )
        .setTimestamp()
        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

    const msg = await message.reply({ embeds: [embed], components: [selectFunction("accueil")] })

    const collector = msg.createMessageComponentCollector({});
    let filter2 = (m) => m.author.id === message.author.id

    collector.on("collect", async (interaction) => {
        const fin = Date.now();
        const embed2 = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
        if (interaction.user.id !== message.author.id || (fin - debut) / 1000 > 600) return interaction.reply({ embeds: [embed2], ephemeral: true })
        if (interaction.customId == "select" && interaction.values[0] == "accueil") {
            interaction.update({ embeds: [embed], components: [selectFunction("accueil")] })
        } else if (interaction.customId == "select" && interaction.values[0] == "antiraid") {
           await EmbedAntiraid(bot, message, interaction)   
        } else if(interaction.customId == "select" && interaction.values[0] == "auto") {
            await EmbedAuto(bot, message, interaction)   
        } else if(interaction.customId == "select" && interaction.values[0] == "automod") {
            await EmbedAutoMod(bot, message, interaction)   
        } else if(interaction.customId == "select" && interaction.values[0] == "welcome") {
            await EmbedBienvenue(bot, message, interaction)   
        } else if(interaction.customId == "select" && interaction.values[0] == "utils") {
            await EmbedUtilitaire(bot, message, interaction)   
        }else if(interaction.customId == "select" && interaction.values[0] == "logs") {
            await EmbedLogs(bot, message, interaction)   
        } else if(interaction.customId == "antispamchanneladd") {
            disableComponents(interaction, msg)
            await antispamFunction.AddChannel(bot, message, msg, EmbedAuto, filter2)
        } else if(interaction.customId == "antispamchannelremove") {
            disableComponents(interaction, msg)
            await antispamFunction.RemoveChannel(bot, message, msg, EmbedAuto, filter2)
        } else if(interaction.customId == "antilinkchanneladd") {
            disableComponents(interaction, msg)
            await antilinkFunction.AddChannel(bot, message, msg, EmbedAutoMod, filter2)
        } else if(interaction.customId == "antilinkchannelremove") {
            disableComponents(interaction, msg)
            await antilinkFunction.RemoveChannel(bot, message, msg, EmbedAutoMod, filter2)
        } else if(interaction.customId == "antiinvitechanneladd") {
            disableComponents(interaction, msg)
            await antiinviteFunction.AddChannel(bot, message, msg, EmbedAutoMod, filter2)
        } else if(interaction.customId == "antiinvitechannelremove") {
            disableComponents(interaction, msg)
            await antiinviteFunction.RemoveChannel(bot, message, msg, EmbedAutoMod, filter2)        
        } else if(interaction.customId == "editlimitantijoin") {
            disableComponents(interaction, msg)
            await antijoinFunction.editLimit(bot, message, msg, EmbedAuto, filter2)
        } else if(interaction.customId == "bvnroleadd") {
            disableComponents(interaction, msg)
            await bvnFunction.Addrole(bot, message, msg, EmbedBienvenue, filter2)
        } else if(interaction.customId == "bvnroleremove") {
            disableComponents(interaction, msg)
            await bvnFunction.RemoveRole(bot, message, msg, EmbedBienvenue, filter2)
        } else if(interaction.customId == "ghostpingchanneladd") {
            disableComponents(interaction, msg)
            await greetFunction.AddChannel(bot, message, msg, EmbedBienvenue, filter2)
        } else if(interaction.customId == "ghostpingchannelremove") {
            disableComponents(interaction, msg)
            await greetFunction.RemoveChannel(bot, message, msg, EmbedBienvenue, filter2)
        } else if(interaction.customId == "configroleauto") {
            disableComponents(interaction, msg)
            await badgeRoleFunction.confgiRole(bot, message, interaction, msg, EmbedUtilitaire)
        } else if(interaction.customId == "updatebadgemanuel") {
            disableComponents(interaction, msg)
            await badgeRoleFunction.manuelleBadge(bot, message, interaction, msg, EmbedUtilitaire)
        } else if(interaction.customId == "chooserole") {
            disableComponents(interaction, msg)
            await statutroleFunction.configRole(bot, message, msg, EmbedUtilitaire, filter2)
        } else if(interaction.customId == "choosestatut") {
            disableComponents(interaction, msg)
            await statutroleFunction.configStatut(bot, message, msg, EmbedUtilitaire, filter2)
        } else if(interaction.customId == "choosechannel") {
            disableComponents(interaction, msg)
            await channelBoostFunction.configsalon(bot, message, msg, EmbedUtilitaire, filter2, interaction.customId.split("-"))
        } else if(interaction.customId == "logs-channelAntiraid" || interaction.customId == "logs-channelMods" ||interaction.customId == "logs-channelMember" || interaction.customId == "logs-channelGuild" || interaction.customId == "logs-channelMessage") {
            disableComponents(interaction, msg)
            await logsFunction.configsalon(bot, message, msg, EmbedLogs, filter2, interaction.customId.split("-"))
        } else if(interaction.customId == "configlogs") {
            disableComponents(interaction, msg)
            await logsFunction.configsalonAuto(bot, message, msg, EmbedLogs)
        }else if(interaction) {
            const textSplit = interaction.customId.split("-")
            if(textSplit[1] == "antiraid") {
                bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    bot.db.query(`UPDATE antiraid SET ${textSplit[0]} = "${req[0][textSplit[0]] == "on" ? "off" : "on"}" WHERE guildId = ${message.guild.id}`);
                    await EmbedAntiraid(bot, message, interaction)
                })
            } else if(textSplit[1] == "auto") {
                bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    bot.db.query(`UPDATE antiraid SET ${textSplit[0]} = "${req[0][textSplit[0]] == "on" ? "off" : "on"}" WHERE guildId = ${message.guild.id}`);
                    await EmbedAuto(bot, message, interaction)
                })
            } else if(textSplit[1] == "automod") {
                bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    bot.db.query(`UPDATE antiraid SET ${textSplit[0]} = "${req[0][textSplit[0]] == "on" ? "off" : "on"}" WHERE guildId = ${message.guild.id}`);
                    await EmbedAutoMod(bot, message, interaction)
                })
            } else if(textSplit[1] == "bienvenue") {
                bot.db.query(`SELECT * FROM bienvenue WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    bot.db.query(`UPDATE bienvenue SET ${textSplit[0]} = "${req[0][textSplit[0]] == "on" ? "off" : "on"}" WHERE guildId = ${message.guild.id}`);
                    await EmbedBienvenue(bot, message, interaction)
                })
            } else if(textSplit[1] == "utilitaire") {
                bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    bot.db.query(`UPDATE utilitaire SET ${textSplit[0]} = "${req[0][textSplit[0]] == "on" ? "off" : "on"}" WHERE guildId = ${message.guild.id}`);
                    await EmbedUtilitaire(bot, message, interaction)
                })
            }
        }
    })
}
function selectFunction(option) {
    const select = new Discord.StringSelectMenuBuilder()
        .setCustomId('select')
        .setDisabled(false)
        .addOptions(
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Page d\'accueil')
                .setValue('accueil')
                .setDefault(option == "accueil")
                .setEmoji("🏠"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Anti-raid')
                .setValue('antiraid')
                .setDefault(option == "antiraid")
                .setEmoji("⚔️"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Anti-spam et auto-raidmode')
                .setValue('auto')
                .setDefault(option == "auto")
                .setEmoji("🧨"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Auto-modération')
                .setValue('automod')
                .setDefault(option == "automod")
                .setEmoji("🛠️"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Actions de bienvenue')
                .setValue('welcome')
                .setDefault(option == "welcome")
                .setEmoji("👋"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Utilitaire')
                .setValue('utils')
                .setDefault(option == "utils")
                .setEmoji("🔧"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Logs du serveur')
                .setDefault(option == "logs")
                .setValue('logs')
                .setEmoji("🧾"),
        );
    const row = new Discord.ActionRowBuilder().addComponents(select);

    return row

}

async function EmbedAntiraid(bot, message, interaction) {
    bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `Configuration de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
            .setColor('White')
            .setTitle("Anti-raid")
            .setDescription(`**Légende : ${bot.emoji.on} Activé ${bot.emoji.off} Désactivé**`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: `**🤖・Protection contre les bots**\n`,
                    value: `${req[0].antibot == "on" ? bot.emoji.on : bot.emoji.off} Empêche l'ajout de bots.`
                },
                {
                    name: `**🔗・Protection contre les webhooks**\n`,
                    value: `${req[0].antiwebhook == "on" ? bot.emoji.on : bot.emoji.off} Empêche la création de webhooks.`
                },
                {
                    name: `**👥・Protection des membres**\n`,
                    value: `${req[0].antiban == "on" ? bot.emoji.on : bot.emoji.off} Empêche de bannir trop rapidement des membres.`
                },
                {
                    name: `**📚・Protection des salons**\n`,
                    value: `${req[0].antichannel == "on" ? bot.emoji.on : bot.emoji.off} Empêche de supprimer trop rapidement des salons.`
                },
                {
                    name: `**🧭・Protection des rôles**\n`,
                    value: `${req[0].antirole == "on" ? bot.emoji.on : bot.emoji.off} Empêche de supprimer trop rapidement des rôles.`
                },
                {
                    name: `**🎭・Protection de l'identité**\n`,
                    value: `${req[0].antiguild == "on" ? bot.emoji.on : bot.emoji.off} Empêche de modifier le nom et l'icône du serveur.`
                },
                {
                    name: `**🔧・Protection des permissions**\n`,
                    value: `${req[0].antiperm == "on" ? bot.emoji.on : bot.emoji.off} Empêche l'ajout de permissions risquées à certains rôles et membres, de façon intelligente.`
                }
            )
            .setTimestamp()
            .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })  

            const bouton1 = new Discord.ButtonBuilder()
            .setEmoji('🤖')
            .setCustomId("antibot-antiraid")
            .setStyle(Discord.ButtonStyle.Secondary)
            const bouton2 = new Discord.ButtonBuilder()
            .setEmoji('🔗')
            .setCustomId("antiwebhook-antiraid")
            .setStyle(Discord.ButtonStyle.Secondary)
            const bouton3 = new Discord.ButtonBuilder()
            .setEmoji('👥')
            .setCustomId("antiban-antiraid")
            .setStyle(Discord.ButtonStyle.Secondary)
            const bouton4 = new Discord.ButtonBuilder()
            .setEmoji('📚')
            .setCustomId("antichannel-antiraid")
            .setStyle(Discord.ButtonStyle.Secondary)
            const bouton5 = new Discord.ButtonBuilder()
            .setEmoji('🧭')
            .setCustomId("antirole-antiraid")
            .setStyle(Discord.ButtonStyle.Secondary)
            const bouton6 = new Discord.ButtonBuilder()
            .setEmoji('🎭')
            .setCustomId("antiguild-antiraid")
            .setStyle(Discord.ButtonStyle.Secondary)
            const bouton7 = new Discord.ButtonBuilder()
            .setEmoji('🔧')
            .setCustomId("antiperm-antiraid")
            .setStyle(Discord.ButtonStyle.Secondary)
            const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3, bouton4, bouton5);   
            const row2 = new Discord.ActionRowBuilder().addComponents(bouton6, bouton7)
            interaction.update({ embeds: [embed], components: [selectFunction('antiraid'), row, row2] })
    })
}

async function EmbedAuto(bot, message, interaction, msg) {
    bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Configuration de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setTitle("Anti-spam et auto-raidmode")
        .setDescription(`**Légende : ${bot.emoji.on} Activé ${bot.emoji.off} Désactivé**`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })  

        let channel = [], limit;
        const channelArray = JSON.parse(req[0].antispamchannel)
        if(channelArray.length === 0) channel == []
        else channelArray.forEach(c => {
            if(message.guild.channels.cache.get(c)) channel.push(message.guild.channels.cache.get(c))
        })

        embed.addFields(
            {
                name: `**🧨・Anti-spam**\n`,
                value: `${req[0].antispam == "on" ? bot.emoji.on : bot.emoji.off} Empêche les membres et les bots de spammer sur le serveur.\n> **Salons ignorés :** ${channelArray.length !== 0 ? channel.map(c => `${c}`).join(", ") : "Aucun salon n'est ignoré par l'anti-spam."}`
            },
            {
                name: `**💣・Mode raid automatique**\n`,
                value: `${req[0].antijoin == "on" ? bot.emoji.on : bot.emoji.off}  Active automatiquement le mode raid si trop de personnes rejoignent le serveur en même temps.\n> **Limite actuelle :** ${req[0].antijoinlimite} personnes en 10 secondes.`
            },
        )

        const bouton1 = new Discord.ButtonBuilder()
        .setEmoji('🧨')
        .setCustomId("antispam-auto")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton2 = new Discord.ButtonBuilder()
        .setLabel("Ajouter un salon")
        .setCustomId("antispamchanneladd")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton3 = new Discord.ButtonBuilder()
        .setLabel("Retirer un salon")
        .setCustomId("antispamchannelremove")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton4 = new Discord.ButtonBuilder()
        .setEmoji('💣')
        .setCustomId("antijoin-auto")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton5 = new Discord.ButtonBuilder()
        .setLabel("Modifier la limite")
        .setCustomId("editlimitantijoin")
        .setStyle(Discord.ButtonStyle.Secondary)

        const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3);   
        const row2 = new Discord.ActionRowBuilder().addComponents(bouton4, bouton5)
        if(interaction) interaction.update({ embeds: [embed], components: [selectFunction('auto'), row, row2] })
        else await msg.edit({ embeds: [embed], components: [selectFunction('auto'), row, row2] })

    })
}

async function EmbedAutoMod(bot, message, interaction, msg) {
    bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Configuration de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setTitle('Auto-modération')
        .setDescription(`**Légende : ${bot.emoji.on} Activé ${bot.emoji.off} Désactivé**`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })  

        let channel = [], channel1 = [];
        const channelArray = JSON.parse(req[0].antilinkchannel)
        if(channelArray.length === 0) channel == []
        else channelArray.forEach(c => {
            if(message.guild.channels.cache.get(c)) channel.push(message.guild.channels.cache.get(c))
        })
        const channelArray2 = JSON.parse(req[0].antiinvitechannel)
        if(channelArray2.length === 0) channel1 == []
        else channelArray2.forEach(c => {
            if(message.guild.channels.cache.get(c)) channel1.push(message.guild.channels.cache.get(c))
        })

        embed.addFields(
            {
                name: `**🔗・Anti-liens**\n`,
                value: `${req[0].antilink == "on" ? bot.emoji.on : bot.emoji.off} Empêche les membres d'envoyer des liens dans les salons filtrés.\n> **Salons surveillés : ** ${channelArray.length !== 0 ? channel.map(c => `${c}`).join(", ") : "Aucun salon filtré."}`
            },
            {
                name: `**📌・Anti-invitations**\n`,
                value: `${req[0].antiinvite == "on" ? bot.emoji.on : bot.emoji.off} Empêche les membres d'envoyer des invitations dans les salons filtrés.\n> **Salons surveillés :** ${channelArray2.length !== 0 ? channel1.map(c => `${c}`).join(", ") : "Aucun salon filtré."}`
            },
        )

        const bouton1 = new Discord.ButtonBuilder()
        .setEmoji('🔗')
        .setCustomId("antilink-automod")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton2 = new Discord.ButtonBuilder()
        .setLabel("Ajouter un salon")
        .setCustomId("antilinkchanneladd")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton3 = new Discord.ButtonBuilder()
        .setLabel("Retirer un salon")
        .setCustomId("antilinkchannelremove")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton4 = new Discord.ButtonBuilder()
        .setEmoji('📌')
        .setCustomId("antiinvite-automod")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton5 = new Discord.ButtonBuilder()
        .setLabel("Ajouter un salon")
        .setCustomId("antiinvitechanneladd")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton6 = new Discord.ButtonBuilder()
        .setLabel("Retirer un salon")
        .setCustomId("antiinvitechannelremove")
        .setStyle(Discord.ButtonStyle.Secondary)

        const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3);   
        const row2 = new Discord.ActionRowBuilder().addComponents(bouton4, bouton5, bouton6)
        if(interaction) interaction.update({ embeds: [embed], components: [selectFunction('automod'), row, row2] })
        else await msg.edit({ embeds: [embed], components: [selectFunction('automod'), row, row2] })

    })
}

async function EmbedBienvenue(bot, message, interaction, msg) {
    bot.db.query(`SELECT * FROM bienvenue WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Configuration de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setTitle('Actions de bienvenue')
        .setDescription(`**Légende : ${bot.emoji.on} Activé ${bot.emoji.off} Désactivé**`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })  

        let channel = [], role = [];
        const channelArray = JSON.parse(req[0].ghostpingchannel)
        if(channelArray.length === 0) channel == []
        else channelArray.forEach(c => {
            if(message.guild.channels.cache.get(c)) channel.push(message.guild.channels.cache.get(c))
        })
        const roleArray2 = JSON.parse(req[0].bvnRole)
        if(roleArray2.length === 0) role == []
        else roleArray2.forEach(c => {
            if(message.guild.roles.cache.get(c)) role.push(message.guild.roles.cache.get(c))
        })

        embed.addFields(
            {
                name: `**🧭・Rôles de bienvenue**\n`,
                value: `${req[0].bvn == "on" ? bot.emoji.on : bot.emoji.off} Attribue un ou plusieurs rôles aux nouveaux membres.\n> **Rôles configurés :** ${roleArray2.length !== 0 ? role.map(c => `${c}`).join(", ") : " Aucun rôle n'est configuré."}`
            },
            {
                name: `**👻・Ghost pings**\n`,
                value: `${req[0].ghostping == "on" ? bot.emoji.on : bot.emoji.off} Mentionne les nouveaux membres dans les salons configurés.\n> **Salons configurés :** ${channelArray.length !== 0 ? channel.map(c => `${c}`).join(", ") : "Aucun salon n'est configuré."}`
            },
        )

        const bouton1 = new Discord.ButtonBuilder()
        .setEmoji('🧭')
        .setCustomId("bvn-bienvenue")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton2 = new Discord.ButtonBuilder()
        .setLabel("Ajouter un rôle")
        .setCustomId("bvnroleadd")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton3 = new Discord.ButtonBuilder()
        .setLabel("Retirer un rôle")
        .setCustomId("bvnroleremove")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton4 = new Discord.ButtonBuilder()
        .setEmoji('👻')
        .setCustomId("ghostping-bienvenue")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton5 = new Discord.ButtonBuilder()
        .setLabel("Ajouter un salon")
        .setCustomId("ghostpingchanneladd")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton6 = new Discord.ButtonBuilder()
        .setLabel("Retirer un salon")
        .setCustomId("ghostpingchannelremove")
        .setStyle(Discord.ButtonStyle.Secondary)

        const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3);   
        const row2 = new Discord.ActionRowBuilder().addComponents(bouton4, bouton5, bouton6)
        if(interaction) interaction.update({ embeds: [embed], components: [selectFunction('welcome'), row, row2] })
        else await msg.edit({ embeds: [embed], components: [selectFunction('welcome'), row, row2] })

    })
}

async function EmbedUtilitaire(bot, message, interaction, msg) {
    bot.db.query(`SELECT * FROM utilitaire WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Configuration de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setTitle('Utilitaire')
        .setDescription(`**Légende : ${bot.emoji.on} Activé ${bot.emoji.off} Désactivé**`)
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })  

        embed.addFields(
            {
                name: `**${bot.emoji.staff}・Rôles selon les badges Discord**\n`,
                value: `${req[0].badgerole == "on" ? bot.emoji.on : bot.emoji.off} Permet de donner automatiquement des rôles selon les badges Discord que les utilisateurs possèdent.\n> ${bot.emoji.staff} - ${message.guild.roles.cache.get(req[0].staff) ? message.guild.roles.cache.get(req[0].staff) : "Aucun rôle configuré."}\n> ${bot.emoji.partner} - ${message.guild.roles.cache.get(req[0].partner) ? message.guild.roles.cache.get(req[0].partner) : "Aucun rôle configuré."}\n> ${bot.emoji.certifiedmod} - ${message.guild.roles.cache.get(req[0].certifiedmod) ? message.guild.roles.cache.get(req[0].certifiedmod) : "Aucun rôle configuré."}\n> ${bot.emoji.hypesquad} - ${message.guild.roles.cache.get(req[0].hypesquad) ? message.guild.roles.cache.get(req[0].hypesquad) : "Aucun rôle configuré."}\n> ${bot.emoji.h1} - ${message.guild.roles.cache.get(req[0].h1) ? message.guild.roles.cache.get(req[0].h1) : "Aucun rôle configuré."}\n> ${bot.emoji.h2} - ${message.guild.roles.cache.get(req[0].h2) ? message.guild.roles.cache.get(req[0].h2) : "Aucun rôle configuré."}\n> ${bot.emoji.h3} - ${message.guild.roles.cache.get(req[0].h3) ? message.guild.roles.cache.get(req[0].h3) : "Aucun rôle configuré."}\n> ${bot.emoji.bughunter1} - ${message.guild.roles.cache.get(req[0].bughunter1) ? message.guild.roles.cache.get(req[0].bughunter1) : "Aucun rôle configuré."}\n> ${bot.emoji.bughunter2} - ${message.guild.roles.cache.get(req[0].bughunter2) ? message.guild.roles.cache.get(req[0].bughunter2) : "Aucun rôle configuré."}\n> ${bot.emoji.activedev} - ${message.guild.roles.cache.get(req[0].activedev) ? message.guild.roles.cache.get(req[0].activedev) : "Aucun rôle configuré."}\n> ${bot.emoji.developer} - ${message.guild.roles.cache.get(req[0].developer) ? message.guild.roles.cache.get(req[0].developer) : "Aucun rôle configuré."}\n> ${bot.emoji.premium} - ${message.guild.roles.cache.get(req[0].premium) ? message.guild.roles.cache.get(req[0].premium) : "Aucun rôle configuré."}\n`
            },
            {
                name: `**🧭・Rôle selon le statut**\n`,
                value: `${req[0].statutrole == "on" ? bot.emoji.on : bot.emoji.off} Permet de donner automatiquement un rôle selon le statut de l'utilisateur.\n> **Rôle configuré :** ${message.guild.roles.cache.get(req[0].rolestatut) ? message.guild.roles.cache.get(req[0].rolestatut) : "Aucun rôle configuré."}\n> **Statut configuré :** ${req[0].statut ? req[0].statut : "Aucun statut n'est configuré."}`
            },
            {
                name: `**🔮・Notifications de Boost**\n`,
                value: `${req[0].boost == "on" ? bot.emoji.on : bot.emoji.off} Permet d'envoyer un message dans un salon lorsqu'un utilisateur boost le serveur.\n> **Salon configuré :** ${message.guild.channels.cache.get(req[0].channelboost) ? message.guild.channels.cache.get(req[0].channelboost) : "Aucun salon configuré."}`
            },
        )

        const bouton1 = new Discord.ButtonBuilder()
        .setEmoji(bot.emoji.staff)
        .setCustomId("badgerole-utilitaire")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton2 = new Discord.ButtonBuilder()
        .setLabel("Configuration automatique des rôles")
        .setCustomId("configroleauto")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton3 = new Discord.ButtonBuilder()
        .setLabel("Mise à jour manuelle des badges")
        .setCustomId("updatebadgemanuel")
        .setStyle(Discord.ButtonStyle.Success)
        const bouton4 = new Discord.ButtonBuilder()
        .setEmoji('🧭')
        .setCustomId("statutrole-utilitaire")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton5 = new Discord.ButtonBuilder()
        .setLabel("Choisir le rôle")
        .setCustomId("chooserole")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton6 = new Discord.ButtonBuilder()
        .setLabel("Choisir le statut")
        .setCustomId("choosestatut")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton7 = new Discord.ButtonBuilder()
        .setEmoji("🔮")
        .setCustomId("boost-utilitaire")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton8 = new Discord.ButtonBuilder()
        .setLabel("Choisir le salon")
        .setCustomId("choosechannel")
        .setStyle(Discord.ButtonStyle.Secondary)

        const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3);   
        const row2 = new Discord.ActionRowBuilder().addComponents(bouton4, bouton5, bouton6)
        const row3 = new Discord.ActionRowBuilder().addComponents(bouton7, bouton8)
        if(interaction) interaction.update({ embeds: [embed], components: [selectFunction('utils'), row, row2, row3] })
        else await msg.edit({ embeds: [embed], components: [selectFunction('utils'), row, row2, row3] })

    })
}

async function EmbedLogs(bot, message, interaction, msg) {
    bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Configuration de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setColor('White')
        .setTitle('Logs du serveur')
        .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })  

        embed.addFields(
            {
                name: `**⚔️・Anti-raid**\n`,
                value: `(Dés)activations du mode raid et gestion de la liste blanche.\n> **Salon configuré :** ${message.guild.channels.cache.get(req[0].channelAntiraid) ? message.guild.channels.cache.get(req[0].channelAntiraid) : "Aucun salon n'est configuré."}`
            },
            {
                name: `**🛠️・Modération**\n`,
                value: `(Dé)bannissements, expulsions, exclusions, suppressions d'un ensemble de messages, mise à jour des paramètres vocaux et (dé)verrouillage de salons.\n> **Salon configuré :** ${message.guild.channels.cache.get(req[0].channelMods) ? message.guild.channels.cache.get(req[0].channelMods) : "Aucun salon n'est configuré."}`
            },
            {
                name: `**👥・Membres**\n`,
                value: `Membres qui rejoignent ou quittent le serveur et mise à jour des membres.\n> **Salon configuré :** ${message.guild.channels.cache.get(req[0].channelMember) ? message.guild.channels.cache.get(req[0].channelMember) : "Aucun salon n'est configuré."}`
            },
            {
                name: `**🧭・Serveur, salons et rôles**\n`,
                value: `Mises à jour du serveur, créations, suppressions et modifications de salons et de rôles.\n> **Salon configuré :** ${message.guild.channels.cache.get(req[0].channelGuild) ? message.guild.channels.cache.get(req[0].channelGuild) : "Aucun salon n'est configuré."}`
            },
            {
                name: `**🎭・Messages et vocaux**\n`,
                value: `Mises à jour du serveur, créations, suppressions et modifications de salons et de rôles.\n> **Salon configuré :** ${message.guild.channels.cache.get(req[0].channelMessage) ? message.guild.channels.cache.get(req[0].channelMessage) : "Aucun salon n'est configuré."}`
            },
        )

        const bouton1 = new Discord.ButtonBuilder()
        .setEmoji("⚔️")
        .setCustomId("logs-channelAntiraid")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton2 = new Discord.ButtonBuilder()
        .setEmoji("🛠️")
        .setCustomId("logs-channelMods")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton3 = new Discord.ButtonBuilder()
        .setEmoji("👥")
        .setCustomId("logs-channelMember")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton4 = new Discord.ButtonBuilder()
        .setEmoji("🧭")
        .setCustomId("logs-channelGuild")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton5 = new Discord.ButtonBuilder()
        .setEmoji("🎭")
        .setCustomId("logs-channelMessage")
        .setStyle(Discord.ButtonStyle.Secondary)
        const bouton6 = new Discord.ButtonBuilder()
        .setLabel("Configuration automatique des logs")
        .setCustomId("configlogs")
        .setStyle(Discord.ButtonStyle.Secondary)


        const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2, bouton3, bouton4, bouton5);   
        const row2 = new Discord.ActionRowBuilder().addComponents(bouton6)
        if(interaction) interaction.update({ embeds: [embed], components: [selectFunction('logs'), row, row2] })
        else await msg.edit({ embeds: [embed], components: [selectFunction('logs'), row, row2] })

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
;
}
