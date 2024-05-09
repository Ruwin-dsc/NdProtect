const Discord = require('discord.js')

module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    if(interaction.type === Discord.InteractionType.ApplicationCommand) {
        let slashCommand = require(`../../slashcommands/${interaction.commandName}`);
        slashCommand.run(bot, interaction, interaction.options);
    }
  }}