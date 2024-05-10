const Discord = require('discord.js');
const config = require('../../config.json');
const ms = require("ms")

let arrayAvecLesMessag = [];
let logSent = new Set();
let arrayUser = []

module.exports = {
  name: "messageCreate", 
  async execute(message, bot) {
    if(!message.guild) return
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
    const whitelist = JSON.parse(req[0].whitelist)
    if(message.author.id == bot.user.id) return
    if(whitelist.includes(message.author.id)) return
     bot.db.query(`SELECT * FROM antiraid WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err || req.length < 1) return; 
            if(req[0].antispam == "on") {
                const antispamArray = JSON.parse(req[0].antispamchannel)
                if(antispamArray.includes(message.channel.id)) return
                let data = arrayAvecLesMessag.find(item => item.authorId === message.author.id) || { count: 0, messageIds: [], authorId: message.author.id };
                data.count++;
                data.messageIds.push(message.id);

                if (!arrayAvecLesMessag.find(item => item.authorId === message.author.id)) {
                    arrayAvecLesMessag.push(data);
                  }

                  if (data.count >= 5 && !logSent.has(message.author.id)) {
                    try {
                        await message.channel.bulkDelete(data.messageIds);
                        if(arrayUser.includes(message.author.id)) return
                        const msg1 = message.channel.send(`⚠️ Vous allez être expulsé pour spam.`).then(m => setTimeout(() => { m.delete()}, 5000))
                        arrayUser.push(message.author.id)
                        message.author.send(`⚠️ Vous allez être expulsé pour spam sur le serveur \`${message.author.name}\`.`)
                        message.guild.members.ban(message.member, { reason: `[ANTI-SPAM] Spam (bannissement temporaire)` })
                        await message.guild.bans.remove(message.author)
                      } catch (error) {
                        console.log(error)
                        await message.channel.bulkDelete(arrayAvecLesMessag.filter(messageId => !deletedMessages.has(messageId)))
                      }
                  }

                  setTimeout(() => {
                    arrayAvecLesMessag = arrayAvecLesMessag.filter(item => item.authorId !== message.author.id);
                    logSent.delete(message.author.id); 
                  }, ms("5s"));

      };
    })
})
  }
};

//⚠️ Vous n'êtes pas autorisé à envoyer des invitations dans le salon <#1116074637281984562>.
