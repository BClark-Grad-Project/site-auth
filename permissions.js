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
		if(user.credentials.type === 'admin'){
			next();
		}	else {
			res.redirect(backURL);
		}
	});
};

module.exports.general = function(req, res, next){
	backURL=req.header('Referer') || '/';
	R.get({_id:req.session.user.id}, function(err, user){
		if(err){res.redirect(backURL);}
		if(user.credentials.type === 'general'){
			next();
		}	else {
			res.redirect(backURL);
		}
	});
};
