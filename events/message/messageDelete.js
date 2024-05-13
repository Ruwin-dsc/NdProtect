const Discord = require("discord.js");
const config = require('../../config.json')
module.exports = {
  name: "messageDelete",
  execute(message, bot) {

if (message.channel.type === Discord.ChannelType.DM) return ;
      if(message.embeds.length !== 0) return 

        const snipes = bot.snipes.get(message.channel.id) || [];
        if (snipes.length > 5) snipes.splice(5);

        snipes.unshift({
            msg: message,
            rolecolor: message.member?.roles?.highest.color || "White",
            time: Date.now(),
        });

        bot.snipes.set(message.channel.id, snipes);
    }
}