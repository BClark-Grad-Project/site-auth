// Get the database(db) configuration & functions.
var db = require('./config');

// C.R.U.D. functions.
var R = require('./read');

// Misc.
var backURL;

module.exports.registered = function(req, res, next){
	R({id:req.session.user.id}, function(err, user){
		if(user){
			for(var i in user.authorizations){
				if(user.authorizations[i].service.code === req.app.locals.service_code){
					if(user.id.toString() === req.session.user.id.toString()){
						return next();
					} 
				}
			}
			return false;
		}	
	});	
};

module.exports.admin = function(req, res, next){
	R({id:req.session.user.id}, function(err, user){
		if(user){
			for(var i in user.authorizations){
				if(user.authorizations[i].service.code === req.app.locals.service_code){
					if(user.authorizations[i].access.type === 'admin'){
						return next();
					} 
				}
			}
			return false;
		}	
	});
};

module.exports.general = function(req, res, next){
	R({id:req.session.user.id}, function(err, user){
		if(user){
			for(var i in user.authorizations){
				if(user.authorizations[i].service.code === req.app.locals.service_code){
						return next();
				}
			}
			return false;
		}	
	});
};
