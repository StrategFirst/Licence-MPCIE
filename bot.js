// Librairie
const Discord = require('discord.js');				// service discord
const Safety = require('Safety.js');				// variable sensible
const Dice = require('Dice.js');					// lancer de dé aléatoire
const SuperConsole = require('Printer.js');			// console.log mais en plus esthetique
const MessageCustom = require('Dialogue.js');		// stock en dehors du code les messages custom



// Constante
const commandPrefix = '?';
const inscriptionMessageId = 
	{
		'L1':750691644159819856,
		'L2':750691664577691728,
		'L3':750691695737438249,
		'Ens':750691715983212604,
	};
const events = 
	{
		MESSAGE_REACTION_ADD: 'messageReactionAdd',
		MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
	};



// Initialisation du robot
const bot = new Discord.Client();
let connected = false;



// Connexion
/* aurai besoin d'un try-cath et d'une sécurité en cas de déconnexion */
function LogOn() { bot.login(Safety.token); }

if (!connected) {
	LogOn();
}

// Confirmation robot lancer
bot.on('ready', ready => {
	connected = true;
	SuperConsole.print('Connecter à Discord');
});

// Si le robot ce fait deconnecter
bot.on('disconnect', (erMsg, code) =>{
/* aurai besoin d'un try-cath et d'une sécurité en cas de déconnexion */
	console.log("-=- Disconnect from Discord -- code: ", code, " -- erMsg: ", erMsg, " -=-");	// Affichage console
	connected = false;										// Changement mémoire
});

// Événement quelconque
bot.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = bot.users.get(data.user_id);
	const channel = bot.channels.get(data.channel_id) || await user.createDM();

	/* if (channel.messages.has(data.message_id)) return; */ // having issues with MESSAGE_REACTION_REMOVE */
	

	const message = await channel.fetchMessage(data.message_id);
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	let reaction = message.reactions.get(emojiKey);

	if (!reaction) {
		const emoji = new Discord.Emoji(bot.guilds.get(data.guild_id), data.emoji);
		reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
	}
	bot.emit(events[event.t], reaction, user);
});

// Gestion inscription et désinscription
function AjoutRole(membre,listeRoles,nomRole) { membre.addRole(listeRoles.find( x => (x.name === nomRole) )).catch(console.error); }
function RetirerRole(membre,listeRoles,nomRole) { membre.removeRole(listeRoles.find( x => (x.name === nomRole) )).catch(console.error); }
bot.on('messageReactionAdd', async (reaction, user) =>{
	
	const messageID = reaction.message.id;
	let membre = await reaction.message.guild.fetchMember(user);
	const roles = reaction.message.guild.roles;
	
	if(messageID == inscriptionMessageId.L1 ) {
		switch(reaction.emoji.name) {
			case '🇲': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L1');AjoutRole(membre,roles,'L1-Mathématiques');		break;
			case '🇵': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L1');AjoutRole(membre,roles,'L1-Physique');			break;
			case '🇨': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L1');AjoutRole(membre,roles,'L1-Chimie');			break;
			case '🇮': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L1');AjoutRole(membre,roles,'L1-Informatique');		break;
			case '🇪': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L1');AjoutRole(membre,roles,'L1-Économie');			break;
			case '🇦': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L1');AjoutRole(membre,roles,'L1-Autre');				break;
		}
	} else if(messageID == inscriptionMessageId.L2 ) {
		switch(reaction.emoji.name) {
			case '🇲': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L2');AjoutRole(membre,roles,'L2-Mathématiques');		break;
			case '🇵': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L2');AjoutRole(membre,roles,'L2-Physique');			break;
			case '🇨': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L2');AjoutRole(membre,roles,'L2-Chimie');			break;
			case '🇮': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L2');AjoutRole(membre,roles,'L2-Informatique');		break;
			case '🇪': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L2');AjoutRole(membre,roles,'L2-Économie');			break;
			case '🇦': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L2');AjoutRole(membre,roles,'L2-Autre');				break;
		}
	} else if(messageID == inscriptionMessageId.L3 ) {
		switch(reaction.emoji.name) {
			case '🇲': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L3');AjoutRole(membre,roles,'L3-Mathématiques');		break;
			case '🇵': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L3');AjoutRole(membre,roles,'L3-Physique');			break;
			case '🇨': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L3');AjoutRole(membre,roles,'L3-Chimie');			break;
			case '🇮': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L3');AjoutRole(membre,roles,'L3-Informatique');		break;
			case '🇪': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L3');AjoutRole(membre,roles,'L3-Économie');			break;
			case '🇦': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L3');AjoutRole(membre,roles,'L3-Autre');				break;
			case '🇸': 	AjoutRole(membre,roles,'Étudiant');AjoutRole(membre,roles,'L3');AjoutRole(membre,roles,'L3-InformatiquePro');	break;
		}
	} else if(messageID == inscriptionMessageId.Ens ) {
		switch(reaction.emoji.name) {
			case '👩‍🏫':
			case '👨‍🏫': AjoutRole(membre,roles,'Enseignants');break;
		}
	}

});



bot.on('messageReactionRemove', async (reaction, user) =>{
	
	const messageID = reaction.message.id;
	let membre = await reaction.message.guild.fetchMember(user);
	const roles = reaction.message.guild.roles;
	
	if(messageID == inscriptionMessageId.L1 ) {
		switch(reaction.emoji.name) {
			case '🇲': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L1');RetirerRole(membre,roles,'L1-Mathématiques');	break;
			case '🇵': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L1');RetirerRole(membre,roles,'L1-Physique');		break;
			case '🇨': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L1');RetirerRole(membre,roles,'L1-Chimie');			break;
			case '🇮': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L1');RetirerRole(membre,roles,'L1-Informatique');	break;
			case '🇪': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L1');RetirerRole(membre,roles,'L1-Économie');		break;
			case '🇦': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L1');RetirerRole(membre,roles,'L1-Autre');			break;
		}
	} else if(messageID == inscriptionMessageId.L2 ) {
		switch(reaction.emoji.name) {
			case '🇲': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L2');RetirerRole(membre,roles,'L2-Mathématiques');	break;
			case '🇵': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L2');RetirerRole(membre,roles,'L2-Physique');		break;
			case '🇨': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L2');RetirerRole(membre,roles,'L2-Chimie');			break;
			case '🇮': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L2');RetirerRole(membre,roles,'L2-Informatique');	break;
			case '🇪': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L2');RetirerRole(membre,roles,'L2-Économie');		break;
			case '🇦': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L2');RetirerRole(membre,roles,'L2-Autre');			break;
		}
	} else if(messageID == inscriptionMessageId.L3 ) {
		switch(reaction.emoji.name) {
			case '🇲': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L3');RetirerRole(membre,roles,'L3-Mathématiques');	break;
			case '🇵': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L3');RetirerRole(membre,roles,'L3-Physique');		break;
			case '🇨': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L3');RetirerRole(membre,roles,'L3-Chimie');			break;
			case '🇮': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L3');RetirerRole(membre,roles,'L3-Informatique');	break;
			case '🇪': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L3');RetirerRole(membre,roles,'L3-Économie');		break;
			case '🇦': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L3');RetirerRole(membre,roles,'L3-Autre');			break;
			case '🇸': 	RetirerRole(membre,roles,'Étudiant');RetirerRole(membre,roles,'L3');RetirerRole(membre,roles,'L3-InformatiquePro');	break;
		}
	} else if(messageID == inscriptionMessageId.Ens ) {
		switch(reaction.emoji.name) {
			case '👩‍🏫':
			case '👨‍🏫': RetirerRole(membre,roles,'Enseignants');break;
		}
	}
	
});

// Commandes bot
bot.on('message', message => {
	
	if(message.author.bot) return; 
	let data = message.content.toString().toLowerCase();
	
	if( data.startsWith( commandPrefix ) ) {
		if( data.match( /^\?aide$/ ) ) { 	//?aide
			message.reply(MessageCustom.helpShort);
			message.author.send(MessageCustom.helpLong);
		} else
		if( data.match( /^\?inv$/ ) ) { 	//?inv
			message.reply(MessageCustom.invitationMessage);
		} else 
		if( data.match( /^\?git$/ ) ) {		//?git
			message.reply(MessageCustom.gitMessage);
		} else
		if( data.match( /^\?stats$/ ) ) {	//?stats
			message.reply(MessageCustom.stats);
		} else
		if( data.match(/^\?d(é|e)\ ([0-9]+|(([0-9]+)d([0-9]+)))(\ ([0-9]+|(([0-9]+)d([0-9]+))))*$/g) ) {
			//?dé <x>
			//?de <x>
			//?dé <x>d<y>
			//?dé <x>d<y> <z> <a>d<c>
			//et toute combinaison des modifications
			message.reply( Dice.get( data ) );
	
		} else
		{									// commande inconnu
			message.reply(MessageCustom.errorMessage);
		}
	}
});