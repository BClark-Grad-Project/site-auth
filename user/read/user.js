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

module.exports.byName = function(name, cb){
	User
		.findOne({name: name})
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
		.findOne({email: credentials.user})
		.exec(function(err, userA){
			if(err){return cb(err, null);}
			if(!userA){
				User
				.findOne({name: credentials.user})
				.exec(function(err, userB){
					if(err){return cb(err, null);}
					if(!userB){return cb('No User With Credentials : ' + credentials.user, null);}
							
					if(!userB.validPassword(credentials.password)){
						return cb('Invalid User / Password', null);
					}			
					return cb(null, userB.getData());					
				});
			} else {
				if(!userA.validPassword(credentials.password)){
					return cb('Invalid User / Password', null);
				}			
				return cb(null, userA.getData());
			}
		});	
};