const Discord = require("discord.js")
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();

module.exports = {
    name: 'role-react',
    description: 'Attribuer un rôle en cliquant sur une réaction.',
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "string",
            name: "emoji",
            description: "Emoji à associer au rôle-réaction.",
            required: true,
            autocomplete: false,
        },
        {
          type: "role",
          name: "role",
          description: "Rôle à associer au rôle-réaction.",
          required: true,
          autocomplete: true,
        },
        {
            type: "string",
            name: "message_id",
            description: "ID du message sur lequel mettre le rôle-réaction.",
            required: true,
            autocomplete: false,
        },
        {
            type: "channel",
            name: "channel",
            description: "Salon dans lequel se trouve le message (uniquement si différent du salon actuel).",
            required: false,
            autocomplete: true,
          },
      ],
    async run(bot, message, args) {
        bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
            const whitelist = JSON.parse(req[0].whitelist)
        
            if(message.user.id !== message.guild.ownerId && !whitelist.includes(message.user.id)) {
                const embedError = new Discord.EmbedBuilder()
                .setColor("#ff0000")
                .setDescription(`**❌ Je n'ai pas la permission de supprimer les salons.**`);
        
                return message.reply({ embeds: [embedError] });
            }
            const emoji = message.guild.emojis.cache.get(Discord.parseEmoji(args.getString("emoji")).id) || regex.test(args.getString("emoji"))
            if(!emoji) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription("**❌ Cet emoji est invalide ou je n'y ai pas accès.**")
                return message.reply({ embeds: [embed]})
            }
            const role = args.getRole("role")
            if(!role) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription("**❌ Ce rôle n'existe pas.**")
                return message.reply({ embeds: [embed]})
            }
            const channel = args.getChannel("channel") || message.channel
            const messageId = await channel.messages.fetch(args.getString("message_id")).catch(() => { });
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
                .setFooter({ iconURL: message.user.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.user.username}`})
                .setTimestamp()
                .setDescription(`**Emoji :** ${regex.test(args.getString("emoji")) ? (emoji.animated == true ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`) : args.getString("emoji")}\n**Salon :** ${channel}\n**Rôle :** ${role}\n**Message :** [Lien vers le message](https://discord.com/channels/${message.guild.id}/${channel.id}/${messageId.id})`)
    
                const bouton1 = new Discord.ButtonBuilder()
                .setLabel("Confirmer")
                .setCustomId("confirm")
                .setStyle(Discord.ButtonStyle.Success)
                const bouton2 = new Discord.ButtonBuilder()
                .setLabel("Annuler")
                .setCustomId("stop")
                .setStyle(Discord.ButtonStyle.Secondary)
    
                const row = new Discord.ActionRowBuilder().addComponents(bouton1, bouton2);   
    
                const msg = await message.reply({ embeds: [embed], components: [row], fetchReply: true})
                const collector = msg.createMessageComponentCollector({});
    
                collector.on("collect", async (interaction) => {
                    const embed2 = new Discord.EmbedBuilder()
                    .setColor('Red')
                    .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
                    if(interaction.user.id !== message.user.id) return interaction.reply({ embeds: [embed2], ephemeral: true })
                    if(interaction.customId == "confirm") {
                        msg.components.forEach((row) => {
                            row.components.forEach((component) => {
                                component.data.disabled = true
                            })
                        })
                        await interaction.update({ components: msg.components })
                        await bot.db.query(`INSERT INTO rolereact (guildId, channelId, emoji, messageId, roleId) VALUES ("${message.guild.id}", "${channel.id}", "${args.getString("emoji")}", "${messageId.id}", "${role.id}")`)
                        const embed = new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setDescription(`**✅ Le rôle réaction ${role} a bien été créé sur ce message avec l'emoji ${regex.test(args.getString("emoji")) == false ? (emoji.animated == true ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`) : args.getString("emoji") }.**`)
                        messageId.react(args.getString("emoji"))
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
}
