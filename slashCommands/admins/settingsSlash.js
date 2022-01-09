const { MessageEmbed } = require("discord.js")

module.exports = {
  userPermissions: ["ADMINISTRATOR"],
  command: {
    name: "settings",
    description: "Edit a setting",
    options: [
      {
        type: "STRING",
        name: "prefix",
        required: false,
        description: "Prefix"
      },
      {
        type: "ROLE",
        name: "verifyrole",
        required: false,
        description: "Role to give when verified."
      },
    ]
  },
  run: async (interaction, client) => {
    let prefix = await interaction.options.getString("prefix")
    let verify = await interaction.options.getRole("verifyrole")

    if (prefix) {
        await client.db.guilds.findOneAndUpdate({guildId: interaction.guild.id}, {prefix: prefix})
        return interaction.reply({content: `Updated prefix to ${prefix}`, ephemeral: true})
    } else if (verify) {
        await client.db.guilds.findOneAndUpdate({guildId: interaction.guild.id}, {verifyRoleId: verify.id})
        return interaction.reply({content: `Updated verify role to ${verify}`, ephemeral: true})
    } else {
        let data = await client.db.guilds.findOne({guildId: interaction.guild.id})
        return interaction.reply({content: `Prefix: ${data.prefix}\nVerify role <@&${data.verifyRoleId}>` ,ephemeral: true})
    }
  }
}