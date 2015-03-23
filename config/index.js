var mongo         = require('mongoose');
var config        = require('./conf');
var User          = require('./models/user');
var Access        = require('./models/access');
var Service       = require('./models/service');
var Social        = require('./models/social');
var Authorization = require('./models/authorization');

var conn = {};

var mongoMessage = function(){
	var db = mongo.connection;
	db.once('open', function () {
		console.info('connected: ' + config.db);
	});	
	db.on('error', function(err){
		console.error.bind(console, '!CONNECTION ERROR: ' + config.db);
		console.error.bind(console, err);
	});	
};

var dbConnection = function(){
	var url = 'mongodb://' + config.mongo_host + ':' + config.mongo_port + '/' + config.db;
	return url;
};

module.exports.close = function(){
	return mongo.disconnect();
};

var url = dbConnection();
conn = mongo.createConnection(url);	
mongoMessage();

module.exports.user 		 = conn.model('User', User);
module.exports.access 		 = conn.model('Access', Access);
module.exports.service 		 = conn.model('Service', Service);
module.exports.social        = conn.model('Social', Social);
module.exports.authorization = conn.model('Authorization', Authorization);