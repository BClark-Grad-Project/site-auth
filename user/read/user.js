var User = require('./../models/user');

module.exports.byEmail = function(email, cb){
	User
		.findOne({email: email})
		.exec(function(err, user){
			if(err){return cb(err, null);}
			if(!user){return cb('No User Email: ' + email, null);}

			return cb(null, user.getData());
		});	
};

module.exports.byId = function(id, cb){
	User
		.findOne({_id: id})
		.exec(function(err, user){
			if(err){return cb(err, null);}
			if(!user){return cb('No User Id: ' + id, null);}
			
			return cb(null, user.getData());
		});	
};

module.exports.byType = function(type, cb){
	User
		.find({type: type})
		.exec(function(err, users){
			if(err){return cb(err, null);}
			if(!users){return cb('No User\'s of type: ' + type, null);}
			
			var usersArray = [];
			for(i in users){
				usersArray.push(users[i].getData());
			}
			return cb(null, usersArray);
		});
};

module.exports.verify = function(credentials, cb){
	User
		.findOne({email: credentials.email})
		.exec(function(err, user){
			if(err){return cb(err, null);}
			if(!user){return cb('No User Email: ' + credentials.email, null);}
			
			if(!user.validPassword(credentials.password)){
				return cb('Invalid User / Password', null);
			}			
			return cb(null, user.getData());
		});	
};