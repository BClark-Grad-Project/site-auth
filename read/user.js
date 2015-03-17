var User = require('./../config').user;

module.exports.verify = function(userObj, cb){
	User
		.findOne({email: userObj.user})
		.exec(function(err, user){
			if(err){return cb(err, null);}
			if(!user){
				User
					.findOne({alias: userObj.user})
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

module.exports.get = function(search, cb){
	User
		.findOne(search)
		.exec(function(err, user){
			if(err){return cb(err, search);}
			if(!user){
				return cb('!Not Found',search);
			} else {
				return cb(null, user.getData());
			}
		});	
};