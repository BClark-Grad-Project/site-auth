var Create = require('./create');
var Update = require('./update');
var Conn   = require('./../config');

module.exports.profile = function(userObj, cb){
	if(userObj.user){		
		Conn.open();
		Create.user(userObj.user, function(err, user){
			if(err){
				Conn.close();
				return cb(err, null);
			}
			if(userObj.detail){
				if(userObj.contact){
					for(i in userObj.contact){userObj.contact[i].user = user.id;}
					Create.buildContacts(userObj.contacts, function(err, contacts){
						if(err){
							Conn.close();
							return cb(err, user);
						}
					
						userObj.detail.user = user.id;
						userObj.detail.contact = contacts;
						Create.detail(userObj.detail, function(err, detail){
							Conn.close();
							if(err){return cb(err, user);}
							
							user.detail = detail;
							user.detail.contact = contacts;
							delete user.detail.user;
							
							return cb(null, user);
						});
					});
				} else {
					Create.detail(userObj.detail, function(err, detail){
						Conn.close();
						if(err){return cb(err, user);}
						
						user.detail = detail;
						delete user.detail.user;
						
						return cb(null, user);
					});
				}
			} else {
				Conn.close();
				return cb(null, user);
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