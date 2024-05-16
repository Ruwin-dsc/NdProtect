const Discord = require("discord.js")

exports.help = {
    name: "embed",
    category: 'utilitaire',
    description: "Construire et envoyer un embed avec le bot."
  };
  
exports.run = async (bot, message, args) => { 
    let time = "a"
    message.user = message.author
    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les salons.**`)

        return message.reply({ embeds: [embed] })
    } else {
        const color = "White"

        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: 'Construction d\'un embed', iconURL: bot.user.displayAvatarURL({ dynamic: true}), url: "https://discord.gg/pbQkyJ9NXj" })
            .setDescription("**À tout moment vous pouvez taper :**\n > `remove` pour supprimer le paramètre sélectionné\n > `cancel` pour annuler votre modification")
            .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}` })
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        	.setColor("White")

        let embedtest = new Discord.EmbedBuilder()
            .setDescription("Description par défaut")

        const select = new Discord.StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Que voulez-vous modifier ?")
            .setOptions(
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Modifier le titre")
                    .setEmoji("✏")
                    .setValue("titre"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Modifer la description")
                    .setEmoji("💬")
                    .setValue("desc"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Modifer l'auteur")
                    .setEmoji("👥")
                    .setValue("auteur"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Modifier le pied de page")
                    .setEmoji("🔻")
                    .setValue("pied"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Modifier l'icône")
                    .setEmoji("🖼️")
                    .setValue("icone"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Modifier l'image")
                    .setEmoji("🌄")
                    .setValue("image"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Modifier la couleur")
                    .setEmoji("🎨")
                    .setValue("color"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Activer/désactiver la date")
                    .setEmoji("⏰")
                    .setValue("date"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Ajouter un champ")
                    .setEmoji("➕")
                    .setValue("plus-champ"),
                new Discord.StringSelectMenuOptionBuilder()
                    .setLabel("Supprimer un champ")
                    .setEmoji("➖")
                    .setValue("moins-champ")
            )

        const button = new Discord.ButtonBuilder()
            .setCustomId("btn")
            .setLabel("Envoyez l'embed")
            .setStyle(Discord.ButtonStyle.Success)

        const row = new Discord.ActionRowBuilder().addComponents(select)
        const row1 = new Discord.ActionRowBuilder().addComponents(button)

        const msg1 = await message.reply({ embeds: [embed, embedtest], components: [row, row1] })

        const collector = msg1.createMessageComponentCollector();

        collector.on("collect", async (i) => {
            const embed2 = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
            if (i.user.id !== message.author.id) return i.reply({ embeds: [embed2], ephemeral: true })
            if (i.customId === "select") {
                const selectedValue = i.values[0];
                if (selectedValue === "titre") {
                    await i.deferUpdate()
                    const newTitleMsg = await i.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Quel titre voulez-vous afficher ?").setColor(color)] });

                    const filter = (msg) => msg.author.id === message.user.id;
                    const response = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (response && response.first()) {
                        const newTitle = response.first().content.trim();
                        const newTitleMsg2 = await i.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("**Quel lien voulez-vous ouvrir en cliquant sur le titre ?**").setColor(color)] });
                        const response2 = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });
                        if (response2 && response2.first()) {
                        try {
                            const newTitle2 = response2.first().content.trim();
                            embedtest.setTitle(newTitle);
                            embedtest.setURL(newTitle2)
                            await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })
                        } catch { 
                            embedtest.setTitle(newTitle);
                            await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })
                        }


                        await response.first().delete();
                        await response2.first().delete();
                        await newTitleMsg.delete();
                        await newTitleMsg2.delete();
                        }
                    }
                } else if (selectedValue === "desc") {
                    await i.deferUpdate()
                    const newdescmsg = await i.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Quelle description voulez-vous afficher ?").setColor(color)] });

                    const filter = (msg) => msg.author.id === message.author.id;
                    const response = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (response && response.first()) {
                        const newdesc = response.first().content.trim();
                        embedtest.setDescription(newdesc);

                        await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })

                        await response.first().delete();
                        await newdescmsg.delete();
                    }
                } else if (selectedValue === "auteur") {
                    await i.deferUpdate()
                    const newauthormsg = await i.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Quelle nom d'auteur voulez-vous afficher ?").setColor(color)] });

                    const filter = (msg) => msg.author.id === message.user.id;
                    const response = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (response && response.first()) {
                        const newauthor = response.first().content.trim();
                        embedtest.setAuthor({ name: newauthor });

                        await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })

                        await response.first().delete();
                        await newauthormsg.delete();
                    }
                } else if (selectedValue === "pied") { //le pied à xvqh
                    await i.deferUpdate()
                    const newfootermsg = await i.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Quelle texte voulez-vous afficher en pied de page ?").setColor(color)] });

                    const filter = (msg) => msg.author.id === message.user.id;
                    const response = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (response && response.first()) {
                        const newfooter = response.first().content.trim();
                        embedtest.setFooter({ text: newfooter });

                        await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })

                        await response.first().delete();
                        await newfootermsg.delete();
                    }
                } else if (selectedValue === "icone") {
                    await i.deferUpdate()
                    const newthmmsg = await i.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Quelle icône voulez-vous afficher ?").setColor(color)] });

                    const filter = (msg) => msg.author.id === message.user.id;
                    const response = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (response && response.first()) {
                        const newthm = response.first().content.trim();
                        embedtest.setThumbnail(newthm);

                        await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })

                        await response.first().delete();
                        await newthmmsg.delete();
                    }
                } else if (selectedValue === "image") {
                    await i.deferUpdate()
                    const newimagemsg = await i.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Quelle image voulez-vous afficher sous l'embed ?").setColor(color)] });

                    const filter = (msg) => msg.author.id === message.user.id;
                    const response = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (response && response.first()) {
                        const newimage = response.first().content.trim();
                        try {
                        embedtest.setImage(newimage);
                        } catch(e) {
                            await response.first().delete();
                            await newimagemsg.delete();
                            await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })
                        }

                        await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })

                        await response.first().delete();
                        await newimagemsg.delete();
                    }
                } else if (selectedValue === "color") {
                    await i.deferUpdate()
                    const newcolormsg = await message.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Quelle couleur voulez-vous afficher à gauche de l'embed ? (exemple : #FFFFFF = blanc)").setColor(color)] });

                    const filter = (msg) => msg.author.id === message.user.id;
                    const response = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (response && response.first()) {
                        const newcolor = response.first().content.trim();

                        if (!isValidColor(newcolor)) {
                            await newcolormsg.delete();
                            await response.first().delete();
                            return;
                        }
                        embedtest.setColor(newcolor);

                        await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] });
                        await newcolormsg.delete();
                        await response.first().delete();
                    }

                    function isValidColor(color) {
                        const colorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
                        return colorRegex.test(color);
                    }
                } else if (selectedValue === "date") {
                    await i.deferUpdate()

                    if (time !== null) {
                        embedtest.setTimestamp();
                        time = null
                    } else {
                        const json = embedtest
                        delete json.data.timestamp
                        embedtest = json
                        time = 'a'
                    }

                    await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })
                } else if (selectedValue === "plus-champ") {
                    await i.deferUpdate()
                    const newFieldMsg = await i.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Quel est le titre du nouveau champ ?").setColor(color)] });
                    const filter = (msg) => msg.author.id === message.user.id;
                    const responseTitle = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (!responseTitle || !responseTitle.first()) {
                        await newFieldMsg.delete();
                        return;
                    }

                    const fieldTitle = responseTitle.first().content.trim();

                    await responseTitle.first().delete();

                    await newFieldMsg.edit({ embeds: [new Discord.EmbedBuilder().setDescription("Quelle est la valeur du nouveau champ ?").setColor(color)] });
                    const responseValue = await i.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (!responseValue || !responseValue.first()) {
                        await newFieldMsg.delete();
                        return;
                    }

                    const fieldValue = responseValue.first().content.trim();

                    await responseValue.first().delete();

                    embedtest.addFields({ name: fieldTitle, value: fieldValue });


                    await msg1.edit({ embeds: [embed, embedtest], components: [row, row1] })

                    await newFieldMsg.delete();
                } else if (selectedValue === "moins-champ") {
                    await i.deferUpdate()
                const msgQuestion = await message.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("QQuel champ voulez-vous supprimer ? (un numéro)").setColor("White")] });
                message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] }).then(async (collected) => {
                    if (!embedtest.data.fields) return collected.first().delete(), msgQuestion.delete()
                    if (isNaN(collected.first().content)) return collected.first().delete(), msgQuestion.delete()
                    if (collected.first().content > embedtest.data?.fields) return collected.first().delete(), msgQuestion.delete()

                    collected.first().delete(), msgQuestion.delete()
                    
                    embedtest.spliceFields(Number(collected.first().content) - 1, 1)
                    msg1.edit({ embeds: [embedtest] })
                }).catch(e => {
                    msgQuestion.delete()
                })
                }
            } else if (i.isButton()) {
                const customId = i.customId;

                if (customId === "btn") {
                    await i.deferUpdate()
                    await message.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription("Dans quel salon voulez-vous envoyer l'embed ?").setColor(color)] });

                    const filter = (msg) => msg.author.id === message.user.id;
                    const response = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });

                    if (!response || !response.first()) {
                        return;
                    }

                    const channelMention = response.first().content.trim();
                    let channel = null;

                    if (channelMention.startsWith("<#") && channelMention.endsWith(">")) {
                        const channelId = channelMention.slice(2, -1);
                        channel = message.guild.channels.cache.get(channelId);
                    } else {
                        channel = message.guild.channels.cache.find((channel) => channel.name === channelMention && channel.type === Discord.ChannelType.GuildText);
                    }

                    if (!channel || channel.type !== Discord.ChannelType.GuildText) {
                        await message.replyUp({ embeds: [new Discord.EmbedBuilder().setDescription("Salon invalide.").setColor("#FF0000")] });
                        return;
                    }

                    try {
                        await channel.send({ embeds: [embedtest] });
                        await message.channel.send({ embeds: [new Discord.EmbedBuilder().setDescription(`✅ L'embed a bien été envoyé dans ${channel}!`).setColor("#008000")] });
                    } catch (error) { }
                }
            }
        })
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