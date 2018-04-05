const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});
const autorole = require("./autoroles.json");

var prefix = 'mL+';
client.on('message', message => {
    if(message.channel.id == 429629491598589983){
        message.guild.channels.get("429650257723392011").sendMessage('**Petición de '
                + message.member.nickname + '('
                + message.author.tag + ' ' + message.author.id +') \n'+
            message.content);
        message.delete();
    } else if(message.channel.id == 429624999683424261){
        if (message.content.startsWith(prefix + 'ping')) {
            message.channel.sendMessage('Its over 999!!!!');
        } else if (message.content.startsWith(prefix + 'testjson')){
            message.channel.send(autorole.memes.chats[0]);
        } else if (message.content.startsWith(prefix + 'testsend')){
            let entrada = message.content.split(" ");
            if(entrada[1].slice(0,2) == "<@"){
                console.log(message.guild.members.has(entrada[1].slice(2,-1)));
            } else if(entrada[1].slice(0,2) == "<#"){
                console.log(message.guild.channels.has(entrada[1].slice(2,-1)));
            } else if(isNaN(entrada[1])){
                console.log("ID no detectada");
            } else {
                if(isNaN(entrada[2])){
                    console.log("En este servidor");
                } else {
                    console.log("en otro servidor");
                }
                
            }
        }
    } else if(message.channel.id == 429649915174453250){
        if (message.content.startsWith('nueva')) {
            message.channel.sendMessage('creada DB');
            message.delete();
        }
    } else if(message.channel.id == 429655030040363018){
        if(message.author.dmChannel == null){
            message.author.createDM().then(dmc => {
                dmc.send({
                      files: ['https://images7.memedroid.com/images/UPLOADED153/54c6c65e8cf07.jpeg']
                    })
                    .then(message => console.log(`Sent message: ${message.content}`))
                    .catch(er => {
                        message.member.removeRole(message.guild.roles.find("name", "no miembro"), "Por seguridad");
                        message.member.addRole(message.guild.roles.find("name", "n00bs"), "Bienvenido");
                    });
            });
        } else {
            message.author.dmChannel.send({
                  files: ['http://m.memegen.com/p9l8o1.jpg']
                })
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(er => {
                    message.member.removeRole(message.guild.roles.find("name", "no miembro"), "Por seguridad");
                    message.member.addRole(message.guild.roles.find("name", "n00bs"), "Bienvenido");
                });
        }
        message.delete();
    } else {
        let d = new Date();
        if (message.attachments.size > 0) {
            switch(Math.round(Math.random() * autorole.memes.chance)) {
                case 1:
                    for(i = 0; i < 4; i++){
                        if(message.channel.id == autorole.memes.chats[i]){
                            message.guild.channels.get(autorole.dbchat).fetchMessage(autorole.memes.timestamp).then(m => {
                                m.edit(message.content.slice(entrada[0].length));
                                if(d.getHours() != m.content.split(" ")[0]){
                                    m.edit(d.getHours() + " let");
                                    let staleveando = 0;
                                    for(j = 1; j < autorole.memes.rango.length; j++){
                                        if(message.member.roles.exists('name', autorole.memes.rango[j-1]) && staleveando == 0){
                                            message.member.removeRole(message.guild.roles.find("name", autorole.memes.rango[j-1]), "Sube de nivel");
                                            message.member.addRole(message.guild.roles.find("name", autorole.memes.rango[j]), "Nuevo nivel");
                                            message.channel.sendMessage('Ahora eres de lv ' + j);
                                        }
                                    }
                                }
                            });
                        }
                    }
                break;
                default:
                console.log("hasta aqui funciono");
            }
        }
    }
});

client.on("guildMemberAdd", (member) => {
    member.addRole(member.guild.roles.find("name", "no miembro"), "Por seguridad");
});
client.on("messageDelete", message => {
    /*let check = 0;
    for(i = 0; i < 2; i++){
        if(message.channel.id == autorole.delUnlog[i]){
            check = 1;
        }
    }*/
    if(message.channel.id == 429655030040363018){
        message.guild.channels.find("name", "log").sendMessage("Tenemos a " + message.author.username + " que intenta entrar.");
    } else if(message.channel.id != 429629491598589983 && message.channel.id != 429649915174453250){
        let rprt = "__Mensaje eliminado__ de _" + message.author.username + "_ en " + message.channel + " \n**``" + message.content + "``**";
        message.guild.channels.find("name", "log").sendMessage(rprt);
    }
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        newMember.addRole(newMember.guild.roles.find("name", "🔊"));
        newMember.guild.channels.find("name", "log").sendMessage(newMember.user.username + " entró en los chats de voz");
    } else if(newUserChannel === undefined){
        newMember.removeRole(newMember.guild.roles.find("name", "🔊"));
        newMember.guild.channels.find("name", "log").sendMessage(newMember.user.username + " salió de los chats de voz");
    }
});

//This is da wae
client.login(process.env.BOT_TOKEN);
