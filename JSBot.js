const Discord = require("discord.js");
const JSBot = new Discord.Client();
const config = require("./config.json");
JSBot.on("ready", async () => {
	console.log(config.READY_MESSAGE);
	JSBot.user.setActivity(config.ACTIVITY_STATUS, {
		type: "KILLING"
});
});
JSBot.on("message", (message) => {
	if (message.channel.type === "dm") { 
		var args = message.content.split(" ").slice(0)
		var args = args.slice(0).join(" ")
		var BOT_ID = JSBot.user.id
		var userID = message.author.id
		if (message.content.startsWith(config.PREFIX)) return message.channel.send(":x: Please use commands in real server! :x:").then(msg => msg.delete(2000))
		if (message.author.bot) return;
		if (message.content.startsWith(config.PREFIX)) return
		if (args.length > 1024) return message.reply("Your message content too many characters (1024 Limit) :/").then(msg => msg.delete(2000))
		var embed = new Discord.RichEmbed()
			.setColor(config.COLOR)
			.setAuthor("New Message", "https://cdn.discordapp.com/attachments/749279336397537313/749347565136511136/receive.png")
			.addField(args, `Sent by: ${message.author.username}`)
			.setFooter("This Message Was Sent By: " + message.author.username + " ", message.author.avatarURL)
			.setTimestamp()
	JSBot.guilds.get(config.SERVER_ID).channels.get(config.CHANNEL_ID).send(embed).catch(console.log(`Message recieved from ${userID}!(${message.author.username})`))
	JSBot.guilds.get(config.SERVER_ID).channels.get(config.CHANNEL_ID).send({embed: {
	"description": `${config.PREFIX}reply ${message.author.id} <message>`,
	}
})
}else if (message.content.startsWith(config.PREFIX + "reply")) {
	if (message.author.id !== config.YOUR_ID) return message.reply('You cannot use that!').then(msg => msg.delete(2000))
		var args = message.content.split(" ").slice(0)
		var Rargs = message.content.split(" ").slice(2).join(" ")
		var userID = args[1]
		if (isNaN(args[1])) return message.reply("This is not an ID! Make sure to you the user's ID!")
		var embed = new Discord.RichEmbed()
			.setColor(config.COLOR)
			.setAuthor("New Message", "https://cdn.discordapp.com/attachments/749279336397537313/749347565136511136/receive.png")
			.setDescription(Rargs)
			.setTitle("**Message**:")
			.setFooter("This Message Was Sent By: " + message.author.username + " ", message.author.avatarURL)
	JSBot.users.get(userID).send(embed).catch(console.log(`Message was sent to ${userID}!`))
	if (message.author.bot) return;
	message.channel.send("Your Message was Sent!").then(msg => msg.delete(3000)).catch(console.error);
	}
});
JSBot.login(config.TOKEN);
