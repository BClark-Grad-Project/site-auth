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

module.exports.create = function(Obj, cb){
  C(Obj, function(err, user){
    if(err){return cb(err, null);}
    
    if(user){
    	if(user.credentials){
    		// When new credentials are created
    		R({authentication:{user:user.id}},function(err, auths){
    			if(err){return cb(err, null);}		
    			
    			user.authentications = [];
    			user.authentications = auths;
        		return cb(null, user);
    		});
    	} else if (user.authorization){
    		// when new access is granted
    		R({credentials:{_id:user.id}},function(err, credentials){
    			if(err){return cb(err, null);}
    			
    			user.credentials = {};
    			user.credentials = credentials;
        		R({authentication:{user:user.id}},function(err, auths){
        			if(err){return cb(err, null);}		

        			user.authentications = [];
        			user.authentications = auths;
            		return cb(null, user);
        		});
    		});
    	} else {
    		return cb('!Object missing value', null);
    	}
    }
  });
};

module.exports.read = function(Obj, cb){
  R(Obj, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.verify = function(credential, cb){
  R.user.verify(credential, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.update = function(Obj, cb){
  U(Obj, function(err, data){
    if(err){return cb(err, null);}
    
    return cb(null, data);
  });
};

module.exports.remove = function(Obj, cb){
  // Currently I am only going to activate and deactivate account auths.  Profile details are contained in separate package & DBMS.
  U(Obj, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};
