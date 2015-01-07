var User  = require('./../models/user');

module.exports.verify = function(userObj, cb){
	User
		.findOne({email: userObj.user})
		.exec(function(err, user){
			if(err){return cb(err, null);}
			if(!user){
				User
					.findOne({email: userObj.user})
					.exec(function(err, user){
						if(err) {return cb(err, null);}
						if(!user) {return cb('Invalid User / Password', null);}
						if(!user.validPassword(userObj.password)){
							return cb('Invalid User / Password', null);
						}			
						return cb(null, user.getData());
					});
			} else {
				if(!user.validPassword(userObj.password)){
					return cb('Invalid User / Password', null);
				}			
				return cb(null, user.getData());
			}
		});	
};

module.exports.get = function(userObj, cb){
	User
		.findOne(userObj)
		.exec(function(err, user){
			if(err){return cb(err, null);}
			if(!user){
				return cb('!Not Found',null);
			} else {
				return cb(null, user.getData());
			}
		});	
};