const Discord = require("discord.js");
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();
exports.help = {
    name: "role-react",
    category: 'admin',
    aliases: ["rr", "rolereact"]
};

exports.run = async (bot, message, args) => {
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const whitelist = JSON.parse(req[0].whitelist)
    
        if(message.author.id !== message.guild.ownerId && !whitelist.includes(message.author.id)) {
            const embedError = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setDescription(`**❌ Je n'ai pas la permission de supprimer les salons.**`);
    
            return message.reply({ embeds: [embedError] });
        }
        if(!args[2]) return message.reply("La syntaxe n'est pas correcte, vous devez envoyer les paramètres comme ceci :```.role-react <emoji ou ID d'emoji> <role ou ID de rôle> <ID du message> [salon ou ID de salon]```")
        const emoji = message.guild.emojis.cache.get(Discord.parseEmoji(args[0]).id) || regex.test(args[0])
        if(!emoji) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("**❌ Cet emoji est invalide ou je n'y ai pas accès.**")
            return message.reply({ embeds: [embed]})
        }
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if(!role) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("**❌ Ce rôle n'existe pas.**")
            return message.reply({ embeds: [embed]})
        }
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[3]) || message.channel
        const messageId = await channel.messages.fetch(args[2]).catch(() => { });
        if(!messageId) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription("**❌ Ce message n'existe pas ou n'est pas dans le salon indiqué.**")
            return message.reply({ embeds: [embed]})
        }
        await bot.db.query(`SELECT * FROM rolereact WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            if(req.length > 0 && req[0].messageId == messageId.id && req[0].emoji == emoji.id) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription("**❌ Ce rôle réaction existe déjà dans ma base de données.**")
                return message.reply({ embeds: [embed]})
            }

            const embed = new Discord.EmbedBuilder()
            .setColor("White")
            .setAuthor({ name: 'Création d\'un rôle réaction', url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true })})
            .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}`})
            .setTimestamp()
            .setDescription(`**Emoji :** ${regex.test(args[0]) ? (emoji.animated == true ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`) : args[0] }\n**Salon :** ${channel}\n**Rôle :** ${role}\n**Message :** [Lien vers le message](https://discord.com/channels/${message.guild.id}/${channel.id}/${messageId.id})`)

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
                    await bot.db.query(`INSERT INTO rolereact (guildId, channelId, emoji, messageId, roleId) VALUES ("${message.guild.id}", "${channel.id}", "${args[0]}", "${messageId.id}", "${role.id}")`)
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`**✅ Le rôle réaction ${role} a bien été créé sur ce message avec l'emoji ${regex.test(args[0]) == false ? (emoji.animated == true ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`) : args[0] }.**`)
                    messageId.react(args[0])
                    return message.channel.send({ embeds: [embed]})
                } else {
                    const embed = new Discord.EmbedBuilder()
                    .setColor("Red")
                    .setDescription("**❌ La création du rôle réaction a été annulée.**")
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
    })
}