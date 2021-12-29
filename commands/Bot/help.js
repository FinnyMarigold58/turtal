const Discord = require("discord.js")

module.exports = {
  name: "help",
  aliases: ["commands"],
  run: async (message, args, client) => {
    let guild = await client.db.guilds.findOne({ guildId: message.guild.id })
    if (args[0]) {
      let givencommand = client.commands.get(args[0].toLowerCase()) || client.commands.find((a) => a.aliases && a.aliases.includes(args[0].toLowerCase()))
      if (!givencommand) return message.reply({content:  `Invalid command! Run \`${guild.prefix}help\` for a full list of commands.`})

      const commandHelpEmbed = new Discord.MessageEmbed()
        .setTitle(`${guild.prefix}${givencommand.name}`)
        .setColor('#7289da')
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(givencommand.description || "No description set")
        if (givencommand.usage) {
          commandHelpEmbed.addField("Usage:", guild.prefix+givencommand.usage)
        } else {
          commandHelpEmbed.addField("Usage:", "No usage provided.")
        }
        commandHelpEmbed.addField("Category:", givencommand.category)
        commandHelpEmbed.addField("Required Permissions:", `${givencommand.userPermissions?.join(", ") || "None"}`)
        commandHelpEmbed.setFooter(`[] = Required and <> = optional | Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
        commandHelpEmbed.setTimestamp()
        return message.reply({ embeds: [commandHelpEmbed]})
    }
    const embed = new Discord.MessageEmbed()
      .setTitle("Help Menu")
      .setColor('#7289da')
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`**__Commands__**`)
      .addField("Bot:", Array.from(client.commands.filter(c => c.category === "Bot").keys()).map(cmd => `\`${guild.prefix}${cmd}\``).join(", ") || "Failed to gather data.")
      .addField("Moderation:", Array.from(client.commands.filter(c => c.category === "Moderation").keys()).map(cmd => `\`${guild.prefix}${cmd}\``).join(", ") || "Failed to gather data.")
      .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
      .setTimestamp()
    return message.reply({ embeds: [embed]})
  },
}