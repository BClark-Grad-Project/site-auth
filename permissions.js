// Get the database(db) configuration & functions.
var db = require('./config');

// C.R.U.D. functions.
var R = require('./read');

// Misc.
var backURL;

module.exports.registered = function(req, res, next){
	db.open();
	backURL=req.header('Referer') || '/';
	R.get({_id:req.session.user.id}, function(err, user){
		db.close();
		if(err){res.redirect(backURL);}
		if(user != undefined){
			next();
		}	else {
			res.redirect(backURL);
		}
	});	
};

module.exports.admin = function(req, res, next){
	db.open();	
	backURL=req.header('Referer') || '/';
	R.get({_id:req.session.user.id}, function(err, user){
		db.close();
		if(err){res.redirect(backURL);}
		if(user != undefined){
			next();
		}	else {
			res.redirect(backURL);
		}
	});
};

module.exports.general = function(req, res, next){
	db.open();	
	backURL=req.header('Referer') || '/';
	R.get({_id:req.session.user.id}, function(err, user){
		db.close();
		if(err){res.redirect(backURL);}
		if(user != undefined){
			next();
		}	else {
			res.redirect(backURL);
		}
	});
};
