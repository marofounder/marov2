const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

    bot.on("ready", async () => {
        console.log(`${bot.user.username} is online!`);
        bot.user.setActivity("Ashley Fire Department", {type: "Watching"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}report`){

        //!report @user (reason)

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user.");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);
  
     let reportschannel = message.guild.channels.find(`name`, "reports");
     if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
  
  
     message.delete().catch(O_o=>{});
     reportschannel.send(reportEmbed);
  
     return;
   }

    if(cmd === `${prefix}hello`){
        return message.channel.send("Hello!")
    }
});

bot.login(botconfig.token);
