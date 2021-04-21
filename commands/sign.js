const discord = require('discord.js');
const client = new discord.Client();
module.exports = {
    name: 'sign',
    description: 'gives a member [2] the role stated [3]',
    async execute(client,message,args) {
        if(!message.member.roles.cache.some(r => r.name === "Franchise Owner")) {
            return message.reply(" You must be a Franchise Owner or Head Coach to do this.")
        }  
        const user = message.mentions.members.first();
        if(!user) return message.reply("Please specifiy a user you would like to sign.")
        const role = message.guild.roles.cache.find(r => r.name === args.slice(1).join(" "));
        if(!role) return message.reply("Please specifiy a team you're signing them to.");
        if (role.position > message.member.roles.highest.position) return message.reply("You can't sign to a role higher than your highest role.")
        if (role.position < user.roles.highest.position) return message.reply("That users role is higher than your highest role.")
       await user.roles.add(role.id)
       const embed = new discord.MessageEmbed()
       .setTitle("Transaction Completed.")
       .setDescription(`${user} has been signed to the ${role}`)
       message.channel.send(embed)
    }
}