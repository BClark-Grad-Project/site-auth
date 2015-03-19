var User = require('./user');
var Authorization = require('./authorization');
var Service = require('./service');
var Access = require('./access');
var Social = require('./social');

module.exports = function(Obj, cb){	
	if(Obj){
		if(Obj.credentials){
			// When credentials are created so should an authorization.
			User(Obj.credentials, function(err, user){
				if(err){return cb(err, null);}
				
				Obj.authorization.user = user.id;
				Authorization(Obj.authorization, function(err, auth){
					if(err){return cb(err, null);}

					if(Obj.credentials.password){
						return cb(null, user);						
					} else {
						return cb({type:'social_check'}, user);
//						Obj.social.user = user.id;
//						Obj.social.service = Obj.authorization.service;
//						Social(Obj.social, function(err, social){
//							if(err){return cb(err, null);}
//
//							user.social = social;							
//							return cb(null, user);					
//						});
					}
				});
			});
		} else if(Obj.authorization){
			// Called when an account already exist. (exclude Obj.credentials)
			var user = {};
			
			user = Obj;
			Authorization(Obj.authorization, function(err, auth){
				if(err){return cb(err, null);}
				
				user.authorization = auth;
				if(Obj.social){
					Obj.social.user = user.id;
					Social(Obj.social, function(err, social){
						if(err){return cb(err, null);}
						
						user.social = social;							
						return cb(null, user);					
					});					
				} else {
					return cb(null, user);	
				}
			});
		} else if(Obj.service){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Do with mongo shell or script for now)
		} else if(Obj.social){
			var user = {};
			
			Obj.social.user = Obj.id;
			user = Obj;
			Social(Obj.social, function(err, social){
				if(err){return cb(err, null);}

				user.social = social;							
				return cb(null, user);					
			});	
		} else if(Obj.access){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Do with mongo shell or script for now)
		}
	}  else {
		return cb('!No Object', null);
	}
};


module.exports.user = User;
module.exports.authorization = Authorization;
module.exports.service = Service;
module.exports.access = Access;
module.exports.social = Social;