const Discord = require('discord.js');
const config = require('../../config.json');
const ms = require("ms")

let arrayAvecLesMessag = [];
let logSent = new Set();
let arrayUser = []
let arrayMsg = []
module.exports = {
  name: "messageCreate", 
  async execute(message, bot) {
    if(!message.guild) return
    if(message.author.id == message.guild.ownerId) return
    bot.db.query(`SELECT * FROM bot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if(req.length < 1) return
    const whitelist = JSON.parse(req[0].whitelist)
    if(message.author.id == bot.user.id) return
    if(message.author.id == message.guild.ownerId)
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
                        const msg1 = message.channel.send(`⚠️ Vous allez être expulsé pour spam.`).then(m => setTimeout(() => { m.delete()}, 5000))
                        arrayUser.push(message.author.id)
                        if(arrayUser.includes(message.author.id)) {
                        if(!arrayMsg.includes(message.author.id)) message.author.send(`⚠️ Vous allez être expulsé pour spam sur le serveur \`${message.guild.name}\`.`), arrayMsg.push(message.author.id)

                        await message.guild.members.ban(message.author.id, { reason: `[ANTI-SPAM] Spam (bannissement temporaire)` })
                        await message.guild.bans.remove(message.author.id)
                        }
                      } catch (error) {
                        console.log(error)
                      }
                  }

                  setTimeout(() => {
                    arrayAvecLesMessag = arrayAvecLesMessag.filter(item => item.authorId !== message.author.id);
                    logSent.delete(message.author.id); 
                    arrayUser = []
                  }, ms("5s"));

      };
    })
})
  }
};
