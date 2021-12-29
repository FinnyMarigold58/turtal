const getUser = require("../../functions/getUser")

module.exports = {
    name: "dm",
    description: "Has the bot dm a user (includes your name)",
    usage: "dm [user] [message]",
    userPermissions: ["ADMINISTRATOR"],
    run: async (message, args, client) => {

        if (!args[0]) return message.reply({
            content: "Please specify a user in the command."
        })

        const user = await getUser(args[0], message)

        if (!user) {
            return message.reply({ content: "User not found."})
        }

        if (!args[1]) return message.reply({
            content: "Please specify a message in the command."
        })

        let mcontent = args.splice(1).join(" ")

        mcontent = `${mcontent}\n\n-${message.author.tag}`

            await user.send({
                content: mcontent
            }).then((msg) => {
                message.reply({
                    content: "Sent message!"
                })
            }).catch((err) => {
                message.reply({
                    content: "Failed to send message to user, may have dms off"
                })
            })
    }
}