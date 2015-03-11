var User = require('./user');
var Authorization = require('./authorization');
var Service = require('./service');
var Social = require('./social');
var Access = require('./access');

module.exports.user = User;
module.exports.authorization = Authorization;
module.exports.service = Service;
module.exports.access = Access;
module.exports.social = Social;

module.exports = function(Obj, cb){
	if(Obj){
		var search = {};
		if(Obj.authorization){
			search = {user:Obj.id, service:Obj.authorization.service};
			Authentication(search, Obj.authentication, function(err, user){
				if(err){return cb(err, null);}
				
				return cb(null, user);
			});
		} else if(Obj.service){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Do with mongo shell or script for now)
		} else if(Obj.access){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Do with mongo shell or script for now)
		} else if(Obj.social){
			// TODO: No need to complete in this iteration. Focus on feature completion.(Do with mongo shell or script for now)
		} else {
			search = {_id:Obj.id};
			User(search, Obj.credentials, function(err, user){
				if(err){return cb(err, null);}
				
				return cb(null, user);
			});
		} 
	}  else {
		return cb('!No Object', null);
	}
};