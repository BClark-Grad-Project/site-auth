var Read = require('./read');
var Conn = require('./../config');

module.exports.profile = function(id, cb){
	Conn.open();
	Read.user.byId(id, function(err, userObj){
		if(err){
			Conn.close(); 
			return cb(err, null);
		}
		
		Read.detail.byUser(user.id, function(err, detail){
			if(err){
				Conn.close(); 
				return cb(err, null);
			}
			
			delete detail.user;
			user.detail = detail;
			Read.contact.byUser(user.id, function(err, contacts){
				Conn.close();
				if(err){return cb(err, null);}
				
				user.detail.contact = contacts;
				return cb(null, user);
			});
		});
	});
};