var User = require('./../models/user');

module.exports.byId = function(id, cb){
	User
		.find()
		.remove({_id: id})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};

module.exports.byEmail = function(email, cb){
	User
		.find()
		.remove({email: email})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};