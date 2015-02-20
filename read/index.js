var User = require('./user');
var Authorization = require('./authorization');
var Service = require('./service');
var Access = require('./access');

module.exports = function(Obj, cb){
	if(Obj){
		if(Obj.authorization){			
			Authorization(Obj.authorization, function(err, auths){
				if(err){return cb(err, null);}
				
				return cb(null, auths);
			});
		} else if(Obj.service){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Use mongo shell for lookup)
			Service(Obj.service, function(err, service){
				if(err){return cb(err, null);}
				
				return cb(null, service);
			});
		} else if(Obj.access){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Use mongo shell for lookup)
			Access(Obj.access, function(err, access){
				if(err){return cb(err, null);}
				
				return cb(null, access);
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
module.exports.access = Access;
