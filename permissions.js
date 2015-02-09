// Get the database(db) configuration & functions.
var db = require('./config');

// C.R.U.D. functions.
var R = require('./read');

// Misc.
var backURL;

module.exports.registered = function(req, res, next){
	backURL=req.header('Referer') || '/';
	R.get({_id:req.session.user.id}, function(err, user){
		if(err){res.redirect(backURL);}
		if(!user){
			res.redirect(backURL);
		}	else {
			next();
		}
	});	
};

module.exports.admin = function(req, res, next){
	backURL=req.header('Referer') || '/';
	R.get({_id:req.session.user.id}, function(err, user){
		if(err){res.redirect(backURL);}
		if(user){
			if(user.credentials.type !== 'admin'){
				res.redirect(backURL);
			}	else {
				next();
			}
		}	else {
			next();
		}
	});
};

module.exports.general = function(req, res, next){
	backURL=req.header('Referer') || '/';
	R.get({_id:req.session.user.id}, function(err, user){
		if(err){res.redirect(backURL);}
		if(user){
			if(user.credentials.type !== 'general'){
				res.redirect(backURL);
			} else {
				next();
			}
		} else {
			next();
		}
	});
};
