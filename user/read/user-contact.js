var UserContact = require('./../models/contact');

module.exports.byId = function(id, cb){
	UserContact
		.findOne({_id: id})
		.exec(function(err, contact){
			if(err){return cb(err, null);}
			if(!contact){return cb('No Contact Id: ' + id, null);}

			return cb(null, contact.getData());
		});	
};

module.exports.byUserAndType = function(contact, cb){
	UserContact
		.findOne({user: contact.user, type: contact.type})
		.exec(function(err, contact){
			if(err){return cb(err, null);}
			if(!contact){return cb('No Contact Type for User: ' + contact.user + ' | ' + contact.type, null);}

			return cb(null, contact.getData());
		});	
};

module.exports.byUser = function(user, cb){
	UserContact
		.find({user: user})
		.exec(function(err, contacts){
			if(err){return cb(err, null);}
			if(!contacts){return cb('No Contact for User: ' + user, null);}
			
			var contactsArray = [];
			for(i in contacts){
				contactsArray.push(contacts[i].getData());
			}
			return cb(null, contactsArray);
		});
};