const Discord = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
exports.help = {
    name: "role-all",
    category: 'admin',
    aliases: ["massiverole", "roleall"]
};

exports.run = async (bot, message, args) => {
    message.user = message.author
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const whitelist = JSON.parse(req[0].whitelist)
    
        if(message.author.id !== message.guild.ownerId && !whitelist.includes(message.author.id)) {
            const embedError = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setDescription(`**❌ Je n'ai pas la permission de donner des rôles.**`);
    
            return message.reply({ embeds: [embedError] });
        }
    const rôle = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!rôle) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Vous devez mentionner un rôle.**`)
        return message.reply({ embeds: [embed]})
    }

    if (rôle.position >= message.member.roles.highest.position) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Je ne peux pas attribuer le rôle ${rôle} car il est situé au dessus de vous dans la hiérarchie des rôles.**`)
        return message.reply({ embeds: [embed]})
    }

    if (message.author.id !== message.guild.ownerId && rôle.position >= message.guild.members.cache.get(bot.user.id).roles.highest.position) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Je ne peux pas attribuer le rôle ${rôle} car il est situé au dessus de moi dans la hiérarchie des rôles.**`)
        return message.reply({ embeds: [embed]})
    }
    if(!rôle.editable) {
        const embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`**❌ Je ne peux pas attribuer le rôle ${rôle} car c'est un rôle d'intégration.**`)
        return message.reply({ embeds: [embed]})
    }
 

  const row3 = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
        .setEmoji("👥")
        .setCustomId('maddhumans')
        .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
        .setEmoji("🤖")
        .setCustomId('maddbot')
        .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
        .setEmoji("♾️")
        .setCustomId('maddall')
        .setStyle(ButtonStyle.Secondary),
     
        new ButtonBuilder()
        .setLabel('Annuler')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('maddstop')
        );
  
    
  const em = new EmbedBuilder()
      .setAuthor({ name: 'Attribution en masse de rôle', url: "https://discord.gg/3PA53mfwSv", iconURL: bot.user.displayAvatarURL({ dynamic: true })})
      .setDescription(`⚠️ Vous vous apprétez à donner le rôle <@&${rôle.id}> aux ${message.guild.memberCount} membres du serveur.
      
      **Que souhaitez-vous faire ?**
      👥・Attribuer le rôle uniquement aux **humains**.
      🤖・Attribuer le rôle uniquement aux **robots**.
      ♾️・Attribuer le rôle à **tous les membres**.`)
      .setColor("White")
      .setFooter({ iconURL: message.author.displayAvatarURL({ dynamic: true }), text: `Demandé par @${message.author.username}`})
      .setTimestamp()
      const menumsg = await message.reply({embeds:[em], components: [row3]})

      function menuselection(i) {
            used1 = true;
        }

      let msg = menumsg


      let filter = i => i.user.id === message.author.id;

      let col = msg.createMessageComponentCollector({
        filter
      });
  

        col.on("collect", async (i) => {
            const embed2 = new Discord.EmbedBuilder()
                .setColor('Red')
                .setDescription(`❌ Vous n'avez pas les permissions d'utiliser ce menu, ou alors le délai d'exécution de la commande est dépassé.`)
                if(i.user.id !== message.user.id) return i.reply({ embeds: [embed2], ephemeral: true })
            if (i.customId === "maddall") {
                  let count = 0
                  const pending = new EmbedBuilder()
                        .setDescription('**:information_source: Attribution du rôle en cours...**')
                        .setColor("Blue")
        i.reply({embeds: [pending]}).then(async m => {
            await message.guild.members.cache.filter(m => !m.roles.cache.has(rôle.id)).forEach(member => {
            member.roles.add(rôle.id);
            })
                  const infinity = new EmbedBuilder()
                  .setDescription(`**✅ Le rôle <@&${rôle.id}> a été attribué à ${message.guild.memberCount} ${message.guild.memberCount > 1 ? 'membres' : 'membre'}.**`)
                  .setColor("Green")
            message.channel.send({embeds: [infinity]});
            if(count === message.guild.memberCount) return message.channel.send({embeds: [infinity]});
            })
            
 

            }

            if (i.customId === "maddhumans") {
                  let count = 0
                  const pending = new EmbedBuilder()
                        .setDescription('**:information_source: Attribution du rôle en cours...**')
                        .setColor("Blue")
        i.reply({embeds: [pending]}).then(m => {
            message.guild.members.cache.filter(m => !m.user.bot && !m.roles.cache.has(rôle.id)).forEach(member => {
            member.roles.add(rôle.id);
            })
                  const infinity = new EmbedBuilder()
                  .setDescription(`**✅ Le rôle <@&${rôle.id}> a été attribué à ${message.guild.members.cache.filter(m => !m.user.bot).size} ${message.guild.members.cache.filter(m => m.roles.cache.has(rôle.id)).size > 1 ? 'humains' : 'humain'}.**`)
                  .setColor("Green")
            message.channel.send({embeds: [infinity]});
            if(count === message.guild.memberCount) return message.channel.send({embeds: [infinity]});
            })
                    }

            if (i.customId === "maddbot") {
                        let count = 0
                        const pending = new EmbedBuilder()
                              .setDescription('**:information_source: Attribution du rôle en cours...**')
                              .setColor("Blue")
              i.reply({embeds: [pending]}).then(m => {
                  message.guild.members.cache.filter(m => m.user.bot && !m.roles.cache.has(rôle.id)).forEach(member => {
                  member.roles.add(rôle.id);
                  })
                        const infinity = new EmbedBuilder()
                        .setDescription(`**✅ Le rôle <@&${rôle.id}> a été attribué à ${message.guild.members.cache.filter(m => m.user.bot).size} ${message.guild.members.cache.filter(m => m.roles.cache.has(rôle.id)).size > 1 ? 'bots' : 'bot'}.**`)
                        .setColor("Green")
                  message.channel.send({embeds: [infinity]});
                  if(count === message.guild.memberCount) return message.channel.send({embeds: [infinity]});
                  })
                          }



            if (i.customId === "maddstop") {
                  const stop = new EmbedBuilder()
                        .setDescription(`**❌ L'attribution du rôle <@&${rôle.id}> a été annulée.**`)
                        .setColor("Red")
            i.channel.send({ embeds: [stop]})
          
            }

            if(i) {
                msg.components.forEach((row) => {
                    row.components.forEach((component) => {
                        component.data.disabled = true
                    })
                })
                await i.update({ components: msg.components })
            }

        })         
    })
}