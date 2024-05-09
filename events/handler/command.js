const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "messageCreate",
  execute(message, bot) {
    if(!message.guild) return
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const prefix = req.length > 0 ? req[0].prefix : "."
        if(req.length < 1) bot.db.query(`INSERT INTO bot (guildId) VALUES (${message.guild.id})`), bot.db.query(`INSERT INTO antiraid (guildId) VALUES (${message.guild.id})`), bot.db.query(`INSERT INTO bienvenue (guildId) VALUES (${message.guild.id})`), bot.db.query(`INSERT INTO utilitaire (guildId) VALUES (${message.guild.id})`), bot.db.query(`INSERT INTO logs (guildId) VALUES (${message.guild.id})`)
          if(message.author.bot) return
          if (message.content === `<@${bot.user.id}>` || message.content === `<@!${bot.user.id}>`) {
            const commands = await bot.application.commands.fetch();
            function findByName(name) {
                return commands.find(command => command.name === name)
            }
            const embed = new Discord.EmbedBuilder()
            .setColor("White")
            .setDescription(`**${bot.emoji.slash} Utilisez-moi en commandes Slash ! Pour commencer, voici ${Discord.chatInputApplicationCommandMention("help", findByName("help").id)}.\nSinon, vous pouvez utiliser le préfixe \`${prefix}\`**`)
            return message.reply({ embeds: [embed]})
          }
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0].toLowerCase();
        let args = messageArray.slice(1);

        let slicecmd;
        if (cmd.startsWith(prefix)) slicecmd = cmd.slice(prefix.length)
        let commandfile = bot.commands.get(slicecmd) || bot.aliases.get(slicecmd);
        if (!commandfile) return;
        if (commandfile) {
            startCommand(commandfile, bot, message, args)
         } else {
            return
          }
        }

    )}
}
    

  

  function startCommand(commandfile, bot, message, args) {
    commandfile.run(bot, message, args);
  }