const Discord = require("discord.js")

exports.help = {
    name: "help",
    category: 'othercommand',
    description: "Afficher l'aide du bot.",
    aliases: ["h"]
};

exports.run = async (bot, message, args) => {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const prefix = req.length > 0 ? req[0].prefix : "."
        const debut = Date.now();
        const commands = await bot.application.commands.fetch();
        function findByName(name) {
            return commands.find(command => command.name === name)
        }
        const embed = new Discord.EmbedBuilder()
            .setColor("White")
            .setAuthor({ name: `Aide de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Sinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
            .addFields(
                { name: "**⚙️・Configuration du bot**", value: `${Discord.chatInputApplicationCommandMention("config", findByName("config").id)}, ${Discord.chatInputApplicationCommandMention("prefix", findByName("prefix").id)}, ${Discord.chatInputApplicationCommandMention("whitelist", findByName("whitelist").id)}` },
                { name: "**🛠️・Administration**", value: `${Discord.chatInputApplicationCommandMention("clear-channels", findByName("clear-channels").id)}, ${Discord.chatInputApplicationCommandMention("clear-roles", findByName("clear-roles").id)}, ${Discord.chatInputApplicationCommandMention("clear-user", findByName("clear-user").id)}, ${Discord.chatInputApplicationCommandMention("nuke", findByName("nuke").id)}, ${Discord.chatInputApplicationCommandMention("prune", findByName("prune").id)}, ${Discord.chatInputApplicationCommandMention("raidmode", findByName("raidmode").id)}, ${Discord.chatInputApplicationCommandMention("role-all", findByName("role-all").id)}, ${Discord.chatInputApplicationCommandMention("role-react", findByName("role-react").id)}, ${Discord.chatInputApplicationCommandMention("unban-all", findByName("unban-all").id)}, ${Discord.chatInputApplicationCommandMention("unmute-all", findByName("unmute-all").id)}` },
                { name: "**⚔️・Modération**", value: `${Discord.chatInputApplicationCommandMention("ban", findByName("ban").id)}, ${Discord.chatInputApplicationCommandMention("clear", findByName("clear").id)}, ${Discord.chatInputApplicationCommandMention("kick", findByName("kick").id)}, ${Discord.chatInputApplicationCommandMention("lock", findByName("lock").id)}, ${Discord.chatInputApplicationCommandMention("mute", findByName("mute").id)}, ${Discord.chatInputApplicationCommandMention("unban", findByName("unban").id)}, ${Discord.chatInputApplicationCommandMention("unlock", findByName("unlock").id)}, ${Discord.chatInputApplicationCommandMention("unmute", findByName("unmute").id)}` },
                { name: "**🔧・Utilitaire**", value: `${Discord.chatInputApplicationCommandMention("ban-list", findByName("ban-list").id)}, ${Discord.chatInputApplicationCommandMention("embed", findByName("embed").id)}, ${Discord.chatInputApplicationCommandMention("history", findByName("history").id)}, ${Discord.chatInputApplicationCommandMention("say", findByName("say").id)}, ${Discord.chatInputApplicationCommandMention("snipe", findByName("snipe").id)}` },
                { name: "**ℹ️・Informations**", value: `${Discord.chatInputApplicationCommandMention("channel-info", findByName("channel-info").id)}, ${Discord.chatInputApplicationCommandMention("invite-info", findByName("invite-info").id)}, ${Discord.chatInputApplicationCommandMention("role-info", findByName("role-info").id)}, ${Discord.chatInputApplicationCommandMention("server-info", findByName("server-info").id)}, ${Discord.chatInputApplicationCommandMention("user-info", findByName("user-info").id)}` },
                { name: "**🧩・Autres commandes**", value: `${Discord.chatInputApplicationCommandMention("bot-info", findByName("bot-info").id)}, ${Discord.chatInputApplicationCommandMention("help", findByName("help").id)}, ${Discord.chatInputApplicationCommandMention("invite", findByName("invite").id)}, ${Discord.chatInputApplicationCommandMention("ping", findByName("ping").id)}` }
            )
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

        const msg = await message.reply({ embeds: [embed], components: [selectFunction("accueil")] })

        const collector = msg.createMessageComponentCollector({});

        collector.on("collect", async (interaction) => {
            const fin = Date.now();
            const embed2 = new Discord.EmbedBuilder()
                .setColor('Red')
                .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
            if (interaction.user.id !== message.author.id || (fin - debut) / 1000 > 600) return interaction.reply({ embeds: [embed2], ephemeral: true })

            if (interaction.customId == "select" && interaction.values[0] == "accueil") {
                interaction.update({ embeds: [embed], components: [selectFunction("accueil")] })
            } else if (interaction.customId == "select" && interaction.values[0] == "othercommand") {
                const embed = new Discord.EmbedBuilder()
                    .setColor("White")
                    .setAuthor({ name: `Aide de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Sinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
                    .setTitle('Autres commandes')
                    .addFields(
                        { name: `${Discord.chatInputApplicationCommandMention("bot-info", findByName("bot-info").id)}\n`, value: `Afficher les informations sur le bot.\n> **Alias :** \`bi\`, \`botinfo\`\n> **Syntaxe :** \`${prefix}bot-info\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("help", findByName("help").id)}\n`, value: `Afficher l'aide du bot.\n> **Alias :** \`h\`\n> **Syntaxe :** \`${prefix}help\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("invite", findByName("invite").id)}\n`, value: `Afficher l'invitation du bot.\n> **Alias :** \`i\`\n> **Syntaxe :** \`${prefix}invite\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("ping", findByName("ping").id)}\n`, value: `Afficher le ping du bot.\n> **Syntaxe :** \`${prefix}ping\`\n> **Permissions requises :** Aucune permission requise` }
                    )
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

                interaction.update({ embeds: [embed], components: [selectFunction("othercommand")] })
            } else if (interaction.customId == "select" && interaction.values[0] == "information") {
                const embed = new Discord.EmbedBuilder()
                    .setColor("White")
                    .setAuthor({ name: `Aide de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Sinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
                    .setTitle('Informations')
                    .addFields(
                        { name: `${Discord.chatInputApplicationCommandMention("channel-info", findByName("channel-info").id)}\n`, value: `Afficher les informations sur un salon.\n> **Alias :** \`ci\`, \`channelinfo\`\n> **Syntaxe :** \`${prefix}channel-info [#salon ou ID de salon]\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("invite-info", findByName("invite-info").id)}\n`, value: `Afficher les informations sur une invitation Discord.\n> **Alias :** \`ii\`, \`inviteinfo\`\n> **Syntaxe :** \`${prefix}invite-info <lien ou code d'invitation>\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("role-info", findByName("role-info").id)}\n`, value: `Afficher les informations sur un rôle.\n> **Alias :** \`ri\`, \`roleinfo\`\n> **Syntaxe :** \`${prefix}role-info <@rôle ou ID de rôle>\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("server-info", findByName("server-info").id)}\n`, value: `Afficher les informations sur le serveur.\n> **Alias :** \`si\`, \`serverinfo\`\n> **Syntaxe :** \`${prefix}server-info\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("user-info", findByName("user-info").id)}\n`, value: `Afficher les informations sur un utilisateur.\n> **Alias :** \`ui\`, \`userinfo\`\n> **Syntaxe :** \`${prefix}user-info [@utilisateur ou ID d'utilisateur]\`\n> **Permissions requises :** Aucune permission requise` },
                    )
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

                interaction.update({ embeds: [embed], components: [selectFunction("information")] })
            } else if (interaction.customId == "select" && interaction.values[0] == "configbot") {
                const embed = new Discord.EmbedBuilder()
                    .setColor("White")
                    .setAuthor({ name: `Aide de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Sinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
                    .setTitle('Configuration du bot')
                    .addFields(
                        { name: `${Discord.chatInputApplicationCommandMention("config", findByName("config").id)}\n`, value: `Configurer les fonctionnalités du bot.\n> **Alias :** \`conf\`\n> **Syntaxe :** \`${prefix}config\`\n> **Permissions requises :** Administrateur` },
                        { name: `${Discord.chatInputApplicationCommandMention("prefix", findByName("prefix").id)}\n`, value: `Configurer le préfixe du bot.\n> **Alias :** \`setprefix\`\n> **Syntaxe :** \`${prefix}prefix [nouveau préfixe]\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("whitelist", findByName("whitelist").id)}\n`, value: `Gérer les membres dans la liste blanche de l'anti-raid.\n> **Alias :** \`wl\`\n> **Syntaxe :** \`${prefix}wl\`\n> **Permissions requises :** Aucune permission requise\n> ⚠️ Réservé au propriétaire et aux membres dans la liste\n> blanche.` },
                    )
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

                interaction.update({ embeds: [embed], components: [selectFunction("configbot")] })
            } else if (interaction.customId == "select" && interaction.values[0] == "utils") {
                const embed = new Discord.EmbedBuilder()
                    .setColor("White")
                    .setAuthor({ name: `Aide de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Sinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
                    .setTitle('Utilitaire')
                    .addFields(
                        { name: `${Discord.chatInputApplicationCommandMention("ban-list", findByName("ban-list").id)}\n`, value: `Afficher la liste des utilisateurs bannis du serveur.\n> **Alias :** \`banlist\`\n> **Syntaxe :** \`${prefix}ban-list\`\n> **Permissions requises :** Bannir des membres` },
                        { name: `${Discord.chatInputApplicationCommandMention("embed", findByName("embed").id)}\n`, value: `Construire et envoyer un embed avec le bot.\n> **Syntaxe :** \`${prefix}embed\`\n> **Permissions requises :** Gérer les salons` },
                        { name: `${Discord.chatInputApplicationCommandMention("history", findByName("history").id)}\n`, value: `Afficher l'historique d'un utilisateur.\n> **Alias :** \`prevname\`, \`prevnames\`\n> **Syntaxe :** \`${prefix}history [@utilisateur ou ID d'utilisateur]\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("say", findByName("say").id)}\n`, value: `Envoyer un message avec le bot.\n> **Syntaxe :** \`${prefix}say <message à faire dire par le bot>\`\n> **Permissions requises :** Gérer les messages` },
                        { name: `${Discord.chatInputApplicationCommandMention("snipe", findByName("snipe").id)}\n`, value: `Afficher les derniers messages supprimés.\n> **Syntaxe :** \`${prefix}snipe [nombre de messages]\`\n> **Permissions requises :** Gérer les messages` },
                    )
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

                interaction.update({ embeds: [embed], components: [selectFunction("utils")] })
            } else if (interaction.customId == "select" && interaction.values[0] == "utils") {
                const embed = new Discord.EmbedBuilder()
                    .setColor("White")
                    .setAuthor({ name: `Aide de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Sinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
                    .setTitle('Utilitaire')
                    .addFields(
                        { name: `${Discord.chatInputApplicationCommandMention("ban-list", findByName("ban-list").id)}\n`, value: `Afficher la liste des utilisateurs bannis du serveur.\n> **Alias :** \`banlist\`\n> **Syntaxe :** \`${prefix}ban-list\`\n> **Permissions requises :** Bannir des membres` },
                        { name: `${Discord.chatInputApplicationCommandMention("embed", findByName("embed").id)}\n`, value: `Construire et envoyer un embed avec le bot.\n> **Syntaxe :** \`${prefix}embed\`\n> **Permissions requises :** Gérer les salons` },
                        { name: `${Discord.chatInputApplicationCommandMention("history", findByName("history").id)}\n`, value: `Afficher l'historique d'un utilisateur.\n> **Alias :** \`prevname\`, \`prevnames\`\n> **Syntaxe :** \`${prefix}history [@utilisateur ou ID d'utilisateur]\`\n> **Permissions requises :** Aucune permission requise` },
                        { name: `${Discord.chatInputApplicationCommandMention("say", findByName("say").id)}\n`, value: `Envoyer un message avec le bot.\n> **Syntaxe :** \`${prefix}say <message à faire dire par le bot>\`\n> **Permissions requises :** Gérer les messages` },
                        { name: `${Discord.chatInputApplicationCommandMention("snipe", findByName("snipe").id)}\n`, value: `Afficher les derniers messages supprimés.\n> **Syntaxe :** \`${prefix}snipe [nombre de messages]\`\n> **Permissions requises :** Gérer les messages` },
                    )
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

                interaction.update({ embeds: [embed], components: [selectFunction("utils")] })
            } else if (interaction.customId == "select" && interaction.values[0] == "mods") {
                const embed = new Discord.EmbedBuilder()
                    .setColor("White")
                    .setAuthor({ name: `Aide de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Sinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
                    .setTitle('Utilitaire')
                    .addFields(
                        { name: `${Discord.chatInputApplicationCommandMention("ban", findByName("ban").id)}\n`, value: `Bannir un utilisateur du serveur.\n> **Syntaxe :** \`${prefix}ban <@utilisateur ou ID d'utilisateur> [raison]\`\n> **Permissions requises :** Bannir des membres` },
                        { name: `${Discord.chatInputApplicationCommandMention("clear", findByName("clear").id)}\n`, value: `Supprimer des messages.\n> **Alias :** \`clr\`\n> **Syntaxe :** \`${prefix}clear <nombre de messages à supprimer>\`\n> **Permissions requises :** Gérer les messages` },
                        { name: `${Discord.chatInputApplicationCommandMention("kick", findByName("kick").id)}\n`, value: `Expulser un utilisateur.\n> **Syntaxe :** \`${prefix}kick <@utilisateur ou ID d'utilisateur> [raison]\`\n> **Permissions requises :** Expulser des membres` },
                        { name: `${Discord.chatInputApplicationCommandMention("lock", findByName("lock").id)}\n`, value: `Verrouiler un salon.\n> **Syntaxe :** \`${prefix}lock [#salon ou ID de salon]\`\n> **Permissions requises :** Gérer les salons` },
                        { name: `${Discord.chatInputApplicationCommandMention("mute", findByName("mute").id)}\n`, value: `Rendre muet un membre du serveur.\n> **Alias :** \`temp-mute\`\n> **Syntaxe :** \`${prefix}s<@utilisateur ou ID d'utilisateur> <durée> [raison]\`\n> **Permissions requises :** Exclure temporairement des membres` },
                        { name: `${Discord.chatInputApplicationCommandMention("unban", findByName("unban").id)}\n`, value: `Révoquer le banissement d'un utilisateur.\n> **Syntaxe :** \`${prefix}unban <@utilisateur ou ID d'utilisateur>\`\n> **Permissions requises :** Bannir des membres` },
                        { name: `${Discord.chatInputApplicationCommandMention("unlock", findByName("unlock").id)}\n`, value: `Déverrouiler un salon.\n> **Syntaxe :** \`${prefix}unlock [#salon ou ID de salon]\`\n> **Permissions requises :** Administrateur` },
                        { name: `${Discord.chatInputApplicationCommandMention("unmute", findByName("unmute").id)}\n`, value: `Rendre la parole à un membre du serveur.\n> **Syntaxe :** \`${prefix}unmute <@utilisateur ou ID d'utilisateur>\`\n> **Permissions requises :** Exclure temporairement des membres` },
                    )
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

                interaction.update({ embeds: [embed], components: [selectFunction("mods")] })
            } 
            else if (interaction.customId == "select" && interaction.values[0] == "admin") {
                const embed = new Discord.EmbedBuilder()
                    .setColor("White")
                    .setAuthor({ name: `Aide de ${bot.user.username}`, url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Sinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
                    .setTitle('Administration')
                    .addFields(
                        {
                            name: Discord.chatInputApplicationCommandMention("clear-channels", findByName("clear-channels").id),
                            value: 'Supprimer tous les salons ayant un nom spécifique.\n' +
                                '> **Alias :** `cc`, `clearchannels`\n' +
                                '> **Syntaxe :** `.clear-channels <#salon, ID de salon ou nom du salon>`\n' +
                                '> **Permissions requises :** Administrateur\n' +
                                '> ⚠️ Réservé au propriétaire et aux membres dans la liste blanche.',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("clear-roles", findByName("clear-roles").id),
                            value: 'Supprimer tous les rôles ayant un nom spécifique.\n' +
                                '> **Alias :** `cr`, `clearroles`\n' +
                                '> **Syntaxe :** `.clear-roles <@role, ID de rôle ou nom du rôle>`\n' +
                                '> **Permissions requises :** Administrateur\n' +
                                '> ⚠️ Réservé au propriétaire et aux membres dans la liste blanche.',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("clear-user", findByName("clear-user").id),
                            value: "Supprimer les messages d'un utilisateur sur l'ensemble du serveur.\n" +
                                '> **Alias :** `cu`, `clearuser`\n' +
                                "> **Syntaxe :** `.clear-user <@utilisateur ou ID d'utilisateur>`\n" +
                                '> **Permissions requises :** Gérer les messages, Exclure temporairement des membres',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("nuke", findByName("nuke").id),
                            value: 'Supprimer un salon et le recréer.\n' +
                                '> **Alias :** `renew`\n' +
                                '> **Syntaxe :** `.nuke`\n' +
                                '> **Permissions requises :** Gérer les salons',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("prune", findByName("prune").id),
                            value: 'Expulser les membres ayant rejoint récemment.\n' +
                                '> **Syntaxe :** `.prune <délai>`\n' +
                                '> **Permissions requises :** Administrateur\n' +
                                '> ⚠️ Réservé au propriétaire et aux membres dans la liste blanche.',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("raidmode", findByName("raidmode").id),
                            value: 'Activer/désactiver le mode raid (empêche de rejoindre le serveur).\n' +
                                '> **Syntaxe :** `.raidmode`\n' +
                                '> **Permissions requises :** Administrateur',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("role-all", findByName("role-all").id),
                            value: 'Attribuer un rôle à tous les membres du serveur.\n' +
                                '> **Alias :** `massiverole`, `rall`, `roleall`\n' +
                                '> **Syntaxe :** `.role-all <@rôle ou ID de rôle>`\n' +
                                '> **Permissions requises :** Administrateur\n' +
                                '> ⚠️ Réservé au propriétaire et aux membres dans la liste blanche.',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("role-react", findByName("role-react").id),
                            value: 'Attribuer un rôle en cliquant sur une réaction.\n' +
                                '> **Alias :** `rr`, `rolereact`\n' +
                                "> **Syntaxe :** `.role-react <emoji ou ID d'emoji> <@role ou ID de rôle> <ID du message> [#salon ou ID de salon]`\n" +
                                '> **Permissions requises :** Administrateur',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("unban-all", findByName("unban-all").id),
                            value: "Révoquer l'ensemble des bannissements du serveur.\n" +
                                '> **Alias :** `unbanall`\n' +
                                '> **Syntaxe :** `.unban-all`\n' +
                                '> **Permissions requises :** Administrateur\n' +
                                '> ⚠️ Réservé au propriétaire et aux membres dans la liste blanche.',
                            inline: false
                        },
                        {
                            name: Discord.chatInputApplicationCommandMention("unmute-all", findByName("unmute-all").id),
                            value: "Révoquer l'ensemble des exclusions du serveur.\n" +
                                '> **Alias :** `unmuteall`\n' +
                                '> **Syntaxe :** `.unmute-all`\n' +
                                '> **Permissions requises :** Administrateur',
                            inline: false
                        }
                    )
                    .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })

                interaction.update({ embeds: [embed], components: [selectFunction("admin")] })
            }
        })
    })
}

function selectFunction(option) {
    const select = new Discord.StringSelectMenuBuilder()
        .setCustomId('select')
        .addOptions(
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Page d\'accueil')
                .setValue('accueil')
                .setDefault(option == "accueil")
                .setEmoji("🏠"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Configuration du bot')
                .setValue('configbot')
                .setDescription(`config, prefix, whitelist`)
                .setDefault(option == "configbot")
                .setEmoji("⚙️"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Administration')
                .setValue('admin')
                .setDescription(`clear-channels, clear-roles, clear-user +7`)
                .setDefault(option == "admin")
                .setEmoji("🛠️"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Modération')
                .setValue('mods')
                .setDescription(`ban, clear, kick, lock, mute, unban +2`)
                .setDefault(option == "mods")
                .setEmoji("⚔️"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Utilitaire')
                .setValue('utils')
                .setDescription(`ban-list, embed, history, say, snipe`)
                .setDefault(option == "utils")
                .setEmoji("🔧"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Informations')
                .setValue('information')
                .setDescription(`channel-info, invite-info, role-info +2`)
                .setDefault(option == "information")
                .setEmoji("ℹ️"),
            new Discord.StringSelectMenuOptionBuilder()
                .setLabel('Autres commandes')
                .setValue('othercommand')
                .setDescription(`bot-info, help, invite, ping`)
                .setDefault(option == "othercommand")
                .setEmoji("🧩"),
        );
    const row = new Discord.ActionRowBuilder().addComponents(select);

    return row
}