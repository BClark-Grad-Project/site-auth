var Create = require('./../create');
var Update = require('./../update');

module.exports.profile = function(userObj, cb){	
	if(userObj.user){	
		Create.user(userObj.user, function(err, user){
			if(err){
				return cb(err, null);
			}

			userObj.detail.user = user.id;			
			if(userObj.contact.type){
				//for(i in userObj.contact){userObj.contact[i].user = user.id;}
				userObj.contact.user = user.id;
				Create.contact(userObj.contact, function(err, contacts){
					if(err){
						return cb(err, null);
					}
										
					userObj.detail.contact = contacts;
					Create.detail(userObj.detail, function(err, detail){
						if(err){return cb(err, null);}
						
						user.detail = detail;
						user.detail.contact = contacts;
						delete user.detail.user;
						
						console.log('Created user: ', user);
						return cb(null, user);
					});
				});
			} else {
				Create.detail(userObj.detail, function(err, detail){
					if(err){
						return cb(err, null);
					}
					
					user.detail = detail;
					delete user.detail.user;
					
					console.log('Created user: ', user);
					return cb(null, user);
				});
			}
		});
	} else {
		return cb('No User Object', null);
	}
};

module.exports.editProfile = function(userObj, cb){
	Conn.open();
	if(userObj.user){
		Update.user(userObj.user, function(err, success){
			if(err){return cb(err, null);}
		});
	}
	if(userObj.detail){
		Update.user(userObj.detail, function(err, success){
			if(err){return cb(err, null);}
		});
	}
	if(userObj.contact){
		Update.user(userObj.contact, function(err, success){
			if(err){return cb(err, null);}
		});
	}
	Conn.close();
	return cb(null, 'Success');
};