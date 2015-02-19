var User = require('./user');
var Authorization = require('./authorization');
var Service = require('./service');
var Access = require('./access');

module.exports.user = User;
module.exports.authorization = Authorization;
module.exports.service = Service;
module.exports.access = Access;

module.exports = function(Obj, cb){
	if(Obj){
		if(Obj.credentials){
			User.get(Obj.credentials,function(err, user){
				if(err){return cb(err, null);}
				
				Authorization({user:user.id}, function(err, auths){
					if(err){return cb(err, null);}
					
					user.authorizations = [];
					user.authorizations = auths;
					return cb(null, user);
				});
			});
		} else if(Obj.authorization){			
			Authorization({user:user.id}, function(err, auths){
				if(err){return cb(err, null);}
				
				return cb(null, auths);
			});
		} else if(Obj.service){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Use mongo shell for lookup)
		} else if(Obj.access){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Use mongo shell for lookup)
		}
	} else {
		return cb('!No Object', null);
	}
};
