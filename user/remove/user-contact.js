var UserContact = require('./../models/user-contact');

module.exports.byId = function(id, cb){
	UserContact
		.find()
		.remove({_id: id})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};

module.exports.byUser = function(user, cb){
	UserContact
		.find()
		.remove({user: user})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};