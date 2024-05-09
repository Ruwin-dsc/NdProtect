const { ActivityType, Events } = require("discord.js");
const loadSlashCommands = require("../../handlers/slashcommand");

module.exports = {
  name: "ready",
  async execute(bot) {
    await loadSlashCommands(bot);
    console.log(`Connectés à ${bot.user.username}`);
    console.log(`Le bot est utilisé sur ${bot.guilds.cache.size} serveur(s) !`);

    bot.user.setPresence({
      activities: [
        {
          name: "privacy is a crime.",
          type: ActivityType.Streaming,
          url: "https://www.twitch.tv/ruwin2007yt",
        },
      ],
      status: "dnd",
    });
  },
};