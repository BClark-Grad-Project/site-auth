var mongo = require('mongoose');
var config = {
   host : "localhost",
   port : 27017,
   db   : "authentication"
};

var mongoMessage = function(){
	var db = mongo.connection;
	db.once('open', function () {
		console.log('connected.');
	});	
	db.on('error', function(err){
		console.error.bind(console, 'AUTHENTICATION DBMS CONNECTION ERROR!!!');
		console.error.bind(console, err);
	});	
};

var dbConnection = function(){
	var url = 'mongodb://' + config.host + ':' + config.port + '/' + config.db;
	return url;
};

module.exports.db = function(){
	return dbConnection();
};

module.exports.open = function(){
	console.log(dbConnection());
	mongo.connect(dbConnection());	
	mongoMessage();
};

module.exports.close = function(){
	mongo.disconnect();
};