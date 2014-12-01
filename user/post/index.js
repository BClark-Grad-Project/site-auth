var Create = require('./../create');
var Update = require('./../update');

module.exports.profile = function(userObj, cb){	
	var profile = {};
	if(userObj.user){	
		Create.user(userObj.user, function(err, user){
			if(err){return cb(err, null);}
			profile.user = user;
			
			userObj.detail.user = user.id;			
			if(userObj.contact){
				for(i in userObj.contact){userObj.contact[i].user = user.id;}
				
				Create.buildContacts(userObj.contact, function(err, contacts){
					if(err){return cb(err, null);}
					profile.contact = contacts;
					
					var contactIds = [];
					for(j in userObj.contact){contactIds.push(contacts[j].id);}
					userObj.detail.contact = contactIds;
					Create.detail(userObj.detail, function(err, detail){
						if(err){return cb(err, null);}
						profile.detail = detail;
						delete profile.detail.user;
						
						return cb(null, profile);
					});
				});
			} else {
				Create.detail(userObj.detail, function(err, detail){
					if(err){return cb(err, null);}					
					profile.detail = detail;
					delete profile.detail.user;
					
					return cb(null, profile);
				});
			}
		});
	} else {
		return cb('No User Object', null);
	}
};

module.exports.editProfile = function(userObj, cb){
	var profile = {};
	if(userObj.user){
		Update.user(userObj.user, function(err, userSaved){
			if(err){return cb(err, null);}
			profile.user = userSaved;
			
			if(userObj.contact){
				Update.contactList(userObj.contact, function(err, contactsSaved){
					if(err){return cb(err, null);}
					
					profile.contact = contactsSaved;
					if(userObj.detail){
						Update.detail(userObj.detail, function(err, detailSaved){
							if(err){return cb(err, null);}
							profile.detail = detailSaved;
							delete profile.detail.user;
							
							return cb(null, profile);
						});
					} else {
						return cb(null, profile);
					}
				});
			} else if(userObj.detail) {
				Update.detail(userObj.detail, function(err, detailSaved){
					if(err){return cb(err, null);}					
					profile.detail = detailSaved;
					delete profile.detail.user;
					
					return cb(null, profile);
				});
			} else {
				return cb(null, profile);
			}
		});
	} else if(userObj.contact){
		Update.contactList(userObj.contact, function(err, contactsSaved){
			if(err){return cb(err, null);}
			profile.contact = contactsSaved;
			
			if(userObj.detail){
				Update.detail(userObj.detail, function(err, detailSaved){
					if(err){return cb(err, null);}
					profile.detail = detailSaved;
					delete profile.detail.user;
					
					return cb(null, profile);
				});
			} else {
				return cb(null, profile);
			}
		});
	} else {
		if(userObj.detail){
			Update.detail(userObj.detail, function(err, detailSaved){
				if(err){return cb(err, null);}
				profile.detail = detailSaved;
				delete profile.detail.user;
				
				return cb(null, profile);
			});
		} else {
			return cb(null, profile);
		}
	} 
};