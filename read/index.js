var User = require('./user');
var Authorization = require('./authorization');
var Service = require('./service');
var Access = require('./access');
var Social = require('./social');

module.exports = function(Obj, cb){
	if(Obj){
		if(Obj.authorization){			
			Authorization(Obj.authorization, function(err, auths){
				if(err){return cb(err, null);}
				
				return cb(null, auths);
			});
		} else if(Obj.service){
			Service(Obj.service, function(err, service){
				if(err){return cb(err, null);}
				
				return cb(null, service);
			});
		} else if(Obj.access){
			Access(Obj.access, function(err, access){
				if(err){return cb(err, null);}
				
				return cb(null, access);
			});			
		} else if(Obj.social){
			Social(Obj.social, function(err, social){
				if(err){return cb(err, null);}
				
				return cb(null, social);
			});			
		} else {
			// If here it should be in proper format but for safety I extract. 
			User.get({_id: Obj.id},function(err, user){
				if(err){return cb(err, null);}
				
				Authorization({user:user.id}, function(err, auths){
					if(err){return cb(err, null);}
					
					user.authorizations = [];
					user.authorizations = auths;
					return cb(null, user);
				});
			});
		} 
	} else {
		return cb('!No Object', null);
	}
};

module.exports.user = User;
module.exports.authorization = Authorization;
module.exports.service = Service;
module.exports.social = Social;
module.exports.access = Access;
