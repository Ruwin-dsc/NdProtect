const Discord = require("discord.js");
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();
const config = require('../../config.json')
module.exports = {
    name: "messageReactionAdd",
    async execute(reaction, user, bot) {
        const guild = bot.guilds.cache.get(reaction.message.guildId)
        await bot.db.query(`SELECT * FROM rolereact WHERE guildId = "${reaction.message.guildId}" AND messageId = "${reaction.message.id}"`, async (err, req) => {
            if(req.length < 1) return
            req.forEach(r => { 
            const emoji = regex.test(r.emoji) || guild.emojis.cache.get(Discord.parseEmoji(r.emoji).id)?.name
            if(reaction.emoji.name == emoji && reaction.message.channelId == r.channelId) {
                const member = bot.guilds.cache.get(reaction.message.guildId).members.cache.get(user.id)
                if(member) {
                    member.roles.add(r.roleId)
                }
            }
        })
    })
    }
}