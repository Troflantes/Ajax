const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
  
  if(args[0] == "help"){
    message.reply("Usage: !addrole <user> <role>");
    return;
  }
  if(!message.member.hasPermission('MANGAE_ROLES')) return message.reply("You don't have the authority!")
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    message.channel.send(`Congrats! ${rMember}, you have been given the role ${gRole.name}!`)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
}

module.exports.help = {
  name: "addrole"
}