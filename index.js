// Get the database(db) configuration & functions.
var db = require('./config');

var is = require('./permissions'); 

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

var grant = function(type, req, res, next){
  console.log('site-auth', type);
  switch(type){
	  case 0: 
		  console.log('registered check');
		  is.registered(req, res, next);  
		  break;
	  case 1: 
		  console.log('admin check');
		  is.admin(req, res, next);  
		  break;
	  case 2: 
		  console.log('general check');
		  is.general(req, res, next);
		  break;
	  default: 
		  is.registered(req, res, next);	  
  }  
};

module.exports.grantAdmin = function(req, res, next){
	grant(1, req, res, next);
};

module.exports.grantUsers = function(req, res, next){
	grant(2, req, res, next);
};

module.exports.grantOwner = function(req, res, next){
	grant(0, req, res, next);
};

module.exports.create = function(userObj, cb){
  console.log('site-auth', userObj);
  C(userObj, function(err, data){
    if(err){return cb(err, null);}
    
    return cb(null, data);
  });
};

module.exports.read = function(search, cb){
  console.log('site-auth', search);
  R.get(search, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.verify = function(credential, cb){
  console.log('site-auth', credential);
  R.verify(credential, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.update = function(userObj, cb){
  console.log('site-auth', userObj);
  U(userObj, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.remove = function(id, cb){
  console.log('site-auth', id);
  D(id, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};
