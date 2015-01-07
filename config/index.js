var mongo = require('mongoose');
var config = require('./conf');

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
	var url = 'mongodb://' + config.host + ':' + config.port + '/' + config.db;
	return url;
};

module.exports.open = function(){
	var url = dbConnection();
	mongo.connect(url);	
	mongoMessage();
};

module.exports.close = function(){
	return mongo.disconnect();
};
