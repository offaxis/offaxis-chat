export default {
  locale: 'fr',
  messages: {
    siteTitle: 'OffAxis/Chat',
    switchLanguage: 'Changer de langue',
    by: 'Par',
    createNewRoom: 'Créer une nouvelle salle de discussion',
    submit: 'Soumettre',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} (in real app this would be translated to French)`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	} (in real app this would be translated to French)`,
    nestedDateComment: `user {name} {value, plural,
  		  =0 {does not have any comments}
  		  =1 {has # comment}
  		  other {has # comments}
  		} as of {date} (in real app this would be translated to French)`,

    createroom: 'Ajouter une discussion',

    messageSend: 'Envoyer',

    norooms: 'Aucune discussion ouverte',
    roomJoin: 'Rejoindre la discussion',
    roomTitle: 'Titre de la discussion',
    roomNoMessages: 'Aucun message',
    roomNoParticipants: 'Aucun participant',
    roomParticipants: 'participant(s)',
    roomUnJoin: 'Quitter la discussion',

    userEmail: 'Email',
    userLogin: 'Connexion',
    userLogout: 'Déconnexion',
    userPassword: 'Mot de passe',
    userRegister: 'Inscription'
  },
};
