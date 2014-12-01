var Read = require('./../read');
var Conn = require('./../../config');

module.exports.profile = function(id, cb){
	var profile = {};
	Conn.open();
	Read.user.byId(id, function(err, user){
		if(err){
			Conn.close(); 
			return cb(err, null);
		}
		profile.user = user;
		
		Read.detail.byUser(id, function(err, detail){
			if(err){
				Conn.close(); 
				return cb(err, null);
			}
			delete detail.user;
			profile.detail = detail;
			
			Read.contact.byUser(id, function(err, contacts){
				Conn.close();
				if(err){return cb(err, null);}
				
				profile.contact = contacts;
				return cb(null, profile);
			});
		});
	});
};