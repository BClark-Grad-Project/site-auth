// Get the database(db) configuration & functions.
var db = require('./config');

var is = require('./permissions'); 

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

module.exports.grant = function(type){
  console.log('site-auth', type);
  switch(type){
	  case 0: 
		  is.registered;  
		  break;
	  case 1: 
		  is.admin;  
		  break;
	  case 2: 
		  is.general;
		  break;
	  default: 
		  is.registered;	  
  }  
};

module.exports.create = function(userObj, cb){
  console.log('site-auth', userObj);
  /**
   * <userObj options>
   *  email:      Required
   *  alias:      Required
   *  password:   Required
   *  type:       Optional
   *  active:     Optional
   */
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
	  /**
	   * <credential options>
	   *  user:       Required
	   *  password:   Required
	   */
  db.open();
  R.verify(credential, function(err, data){
    db.close();
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.update = function(userObj, cb){
  console.log('site-auth', userObj);
  /**
  * <userObj options>
  *  _id:        Required
  *  email:      Optional
  *  alias:      Optional
  *  password:   Optional
  *  type:       Optional
  *  active:     Optional
  */
  U(userObj, function(err, data){
    db.close();
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.remove = function(id, cb){
  console.log('site-auth', id);
  D(id, function(err, data){
    db.close();
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};
