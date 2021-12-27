module.exports = (client) => {
    client.on("ready", async() => {
        console.log("Connected!")
        client.user.setActivity({ name: "Subscribe to SUBLADO" })
    })
}