// Get the database(db) configuration & functions.
var db = require('./config');

var is = require('./permissions'); 

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

var grant = function(type, req, res, next){
  switch(type){
	  case 0: 
		  return is.registered(req, res, next);  
		  break;
	  case 1: 
		  return is.admin(req, res, next);  
		  break;
	  case 2: 
		  return is.general(req, res, next);
		  break;
	  default: 
		  return is.registered(req, res, next);	  
  }  
};

module.exports.grantAdmin = function(req, res, next){
	return grant(1, req, res, next);
};

module.exports.grantUsers = function(req, res, next){
	return grant(2, req, res, next);
};

module.exports.grantOwner = function(req, res, next){
	return grant(0, req, res, next);
};

module.exports.create = function(userObj, cb){
  C(userObj, function(err, data){
    if(err){return cb(err, null);}
    
    return cb(null, data);
  });
};

module.exports.read = function(search, cb){
  R.get(search, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.verify = function(credential, cb){
  R.verify(credential, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.update = function(userObj, cb){
  U(userObj, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.remove = function(id, cb){
  D(id, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};
