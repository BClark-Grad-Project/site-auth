// Index of authentication
var User = require('./user');
var Conn = require('./config');
var Grant = require('./grant');

var fs = require('fs');
var uuid = require('node-uuid');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports.user  = User;
module.exports.grant = Grant;

module.exports.session = function(req, res, next, app){
	if(req.session){
		// If not a registered user assign guest profile to session.
		if(!req.session.user){
			var sess = req.session;
			sess.user = {first: 'Guest', last: 'User', type: 'guest'};
		}
	} else {		
		// Session create
		var hour = 3600000;
		app.use(session({ 
			genid: function() {
				  return uuid.v4();
			},
			secret: 'secret key',
			cookie: { secure:  true,
					  expires: new Date(Date.now() + hour),
					  maxAge:  hour },
			saveUninitialized: true,
		    resave: true,
		    store: new MongoStore({
		        db : Conn.db(),
		      })
		}));
	}
	return next();
};

module.exports.https = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./certificate.pem'),
    requestCert: true
}; 

module.exports.login = function(credentials, cb){
	Conn.open();
	User
		.read
		.verify(credentials, function(err, user){
			Conn.close();
			if(err){return cb(err, null);}
			
			cb(null, user);
		});
};

module.exports.logout = function(cb){
	req.session.destroy(function(err){
		if(err){return cb(err, null);}
		
		return cb(null, 'Session Destroyed');
	});
};