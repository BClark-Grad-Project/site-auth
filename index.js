// Index of authentication
var User = require('./user');
var Conn = require('./config');
var Grant = require('./grant');

var fs = require('fs');
var uuid = require('node-uuid');
var session = require('express-session');

module.exports.user  = User;
module.exports.grant = Grant;

module.exports.session = function(){
	// Session create
	var hour = 3600000;
	
	return session({ 
		genid: function() {
			  return uuid.v4();
		},
		secret: 'secret key',
		cookie: { secure:  true,
				  expires: new Date(Date.now() + hour),
				  maxAge:  hour 
		},
		saveUninitialized: true,
	    resave: true
	});
};

module.exports.registerSession = function(req, res, next){
	if(!req.session.user){
		var sess = req.session;
		sess.user = {type: 'guest', detail:{first: 'Guest', last: 'User'}};
	}
	return next();
};
	
module.exports.https = function(){
	return {
		key: fs.readFileSync('./key.pem'),
		cert: fs.readFileSync('./certificate.pem'),
		requestCert: true
	};
}; 

module.exports.login = function(sess, credentials, cb){
	Conn.open();
	User
		.read
		.user
		.verify(credentials, function(err, user){
			if(err){return cb(err, null);}
			User
			.read
			.detail
			.byUser(user.id, function(err, detail){
				Conn.close();
				if(err){return cb(err, user);}
				user.detail = detail;
				sess.user = user;
				// Hold session for one year if (remember) is checked. 
				if(credentials.remember == 'on'){
					sess.cookie.maxage = 365 * 24 * 60 * 60 * 1000;
				}
				cb(null, user);				
			});
		});
};

module.exports.logout = function(sess, cb){
	sess.destroy(function(err){
		if(err){return cb(err, null);}
		
		return cb(null, 'Session Destroyed');
	});
};

module.exports.register = function(sess, userObj, cb){
	Conn.open();
	User
		.post
		.profile(userObj, function(err, user){
			Conn.close();
			if(err){return cb(err, null);}
			
			sess.user = user;
			return cb(null, user);
		});
};

module.exports.updateProfile = function(userObj, cb){
	Conn.open();
	User
		.post
		.editProfile(userObj, function(err, user){
			Conn.close();
			if(err){return cb(err, null);}
			
			//sess.user = user;
			return cb(null, user);
		});
};