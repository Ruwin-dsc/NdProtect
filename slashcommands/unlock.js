const Discord = require("discord.js")

module.exports = {
    name: 'unlock',
    description: 'Déverrouille un salon.',
    permission: "Aucune",
    dm: false,
    options: [
        {
          type: "channel",
          name: "channel",
          description: "Salon à déverrouiller",
          required: false,
          autocomplete: true,
        }
      ],
    async run(bot, message, args) {
        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`**❌ Vous avez besoin des permissions suivantes pour utiliser cette commande : Gérer les salons.**`)
    
            return message.reply({ embeds: [embed] })
        } else {
            const channel = args.getChannel("channel") || message.channel
            if(!channel.name.startsWith("🔒")) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Blue")
                .setDescription(`ℹ️ ⁠${channel} est déjà déverrouillé.`)
                return message.reply({ embeds: [embed]})
            }
            try {
                await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                    SendMessages: true,
                });
                const embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`**✅ ${channel} a bien été déverrouillé.**`)
                channel.edit({ name: `${channel.name.replace(/🔒-/g, "")}` })
                message.reply({ embeds: [embed]})
                bot.db.query(`SELECT * FROM logs WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                    if(req.length < 1) return

                    const embed = new Discord.EmbedBuilder()
                    .setDescription(`Le salon ${channel} \`${channel.name.replace(/🔒-/g, "")}\` a été déverrouillé.`)
                    .setFooter({ text: `ID du salon : ${message.channel.id}`})
                    .setTitle("Salon déverrouillé")
                    .setColor("Orange")
                    .setTimestamp()
                    .addFields(
                        { name: "Modérateur :", value: `> ${message.member} **@${message.user.username}**`},
                    )

                    const channel2 = message.guild.channels.cache.get(req[0].channelMods)
                    if(channel2) channel2.send({ embeds: [embed]})
                })
            } catch (error) {
                const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription(`**❌ Je n'ai pas les permissions de déverrouiller le salon ${channel}.**`)
                return message.reply({ embeds: [embed]})
            }
            }
        }
    }