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
			// When credentials are created so should an authorization.
			User(Obj.credentials, function(err, user){
				if(err){return cb(err, null);}
				
				Obj.authorization.user = user.id;
				Authorization(Obj.authorization, function(err, auth){
					if(err){return cb(err, null);}
					
					return cb(null, user);
				});
			});
		} else if(Obj.authorization){
			// Called when an account already exist. (exclude Obj.credentials)
			var user = Obj.authorization.user;
			
			Authorization(Obj.authorization, function(err, auth){
				if(err){return cb(err, null);}
				
				user.authorization = auth;
				return cb(null, user);
			});
		} else if(Obj.service){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Do with mongo shell or script for now)
		} else if(Obj.access){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Do with mongo shell or script for now)
		}
	}  else {
		return cb('!No Object', null);
	}
};
