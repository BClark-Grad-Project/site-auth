// Get the database(db) configuration & functions.
var db = require('./config');

var is = require('./permissions'); 

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

module.exports.grant = function(type){
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
  /**
   * <userObj options>
   *  email:      Required
   *  alias:      Required
   *  password:   Required
   *  type:       Optional
   *  active:     Optional
   */
  db.open();
  C(userObj, function(err, data){
    db.close();
    if(err){return cb(err, null);}
    
    return cb(null, data);
  });
};

module.exports.verify = function(credentials, cb){
	  /**
	   * <credentials options>
	   *  user:       Required
	   *  password:   Required
	   */
  db.open();
  R.verify(credentials, function(err, data){
    db.close();
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.update = function(userObj, cb){
	  /**
	   * <userObj options>
	   *  _id:        Required
	   *  email:      Optional
	   *  alias:      Optional
	   *  password:   Optional
	   *  type:       Optional
	   *  active:     Optional
	   */
  db.open();
  U(userObj, function(err, data){
    db.close();
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.remove = function(id, cb){
  db.open();
  D(id, function(err, data){
    db.close();
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};
