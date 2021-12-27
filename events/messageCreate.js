const {Client} = require("discord.js")

/**
 * 
 * @param {Client} client 
 */

const prefix = process.env.PREFIX

module.exports = (client) => {
    client.on("messageCreate", async(message) => {
        if (message.author.bot) return

        if (message.content === `<@!${client.user.id}>`) return message.author.send(`Hey! My prefix is ${prefix}, you can ask for \`${prefix}help\` if you ever need.`)

        const args = message.content.slice(prefix.length).split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command =
            client.commands.get(commandName) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
        if (!command) return

        if (!message.member.permissions.has(command.userPermissions || [])) return message.reply({ content: `You do not have permission to use this command`})
        if (!message.guild.me.permissions.has(command.botPermissions || [])) return message.reply({ content: `I do not have permission to use this command`})

        await command.run(message, args, client)?.catch((error) => {
            console.error(error)
            message.channel.send("Error has occured, devs have been notified.")
        })
    })
}