// Get the database(db) configuration & functions.
var db = require('./config');

var is = require('./permissions'); 

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

var createAuthorization = function(Obj, cb){
	C(Obj, function(err, user){
	    if(err){return cb(err, Obj);}
	    
	    if(user){			    	
	    	// when new access is granted
    		R({credentials:{_id:user.id}},function(err, credentials){
    			if(err){return cb(err, Obj);}
    			
    			user.credentials = {};
    			user.credentials = credentials;
        		R({authorization:{user:user.id}},function(err, auths){
        			if(err){return cb(err, Obj);}		

        			user.authorizations = [];
        			user.authorizations = auths;
            		return cb(null, user);
	        	});
        	});
	    } else {
    		return cb('!Error in creating.', Obj);
    	}	
	});
};

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
	if(Obj){
		if(Obj.credentials){
			R({service:{code:Obj.authorization.service}}, function(err, service){
				if(err){return cb(err, Obj);}	
				
				Obj.authorization.service = service.id;
				R({access:{type: Obj.authorization.access.type, level:Obj.authorization.access.level}}, function(err, access){
					if(err){return cb(err, Obj);}	
					
					Obj.authorization.access = access.id;
					C(Obj, function(err, user){
					    if(err){return cb(err, Obj);}

					    if(user){
				    		// When new credentials are created
							R({authorization:{user:user.id}},function(err, auths){
								if(err){return cb(err, Obj);}		
								
								user.authorization = [];
								user.authorization = auths;
								return cb(null, user);
							});    
					    } else {
				    		return cb('!Error in creating.', Obj);
				    	}
		    		});
		  		});    			
		  	});
		} else if (Obj.authorization){ 
			R({service:{code:Obj.authorization.service}}, function(err, service){
				if(err){return cb(err, null);}	
				
				Obj.authorization.service = service.id;	
				if(Obj.social){
					Obj.social.service = service.id;
				}
				if(!Obj.id){
					R({credentials:{email:Obj.email}},function(err, credentials){
						if(err){return cb(err, Obj);}
						 
						Obj.id = credentials.id;
						createAuthorization(Obj, function(err, user){
							if(err){return cb(err, Obj);}
							
							return cb(null, user);
						});		
					});
				} else {
					createAuthorization(Obj, function(err, user){
						if(err){return cb(err, Obj);}
						
						return cb(null, user);
					});				
				}
			});
    	} else if (Obj.social){ 
			R({service:{code:Obj.social.service}}, function(err, service){
				if(err){return cb(err, Obj);}	
				
				Obj.social.service = service.id;
				if(!Obj.id){
					R({credentials:{email:Obj.email}},function(err, credentials){
						if(err){return cb(err, Obj);}
						
						delete Obj.email;
						Obj.id = credentials.id;
						createAuthorization(Obj, function(err, user){
							if(err){return cb(err, Obj);}
							
							return cb(null, user);
						});		
					});
				} else {
					createAuthorization(Obj, function(err, user){
						if(err){return cb(err, Obj);}
						
						return cb(null, user);
					});				
				}
			});
    	} else {
    		return cb('!Object missing value', null);
    	}
	}
		
};

module.exports.read = function(Obj, cb){
  R(Obj, function(err, data){
    if(err){return cb(err, null);}
  
    return cb(null, data);
  });
};

module.exports.verify = function(credential, cb){
  R.verify(credential, function(err, data){
    if(err){return cb(err, null);}
    
    R({id:data.id},function(err, user){
    	if(err){return cb(err, null);}
    	
    	return cb(null, user);
    });
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
  if(Obj){
	  if(Obj.id){
		  Obj.credentials.active = false;
		  U(Obj, function(err, data){
		    if(err){return cb(err, null);}
		  
		    return cb(null, data);
		  });
	  }
  } else {
	  return cb('!No object', null);
  }
};
