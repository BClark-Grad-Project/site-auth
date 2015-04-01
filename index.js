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
    		R({id:user.id},function(err, credentials){
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

var serviceAuthDetail = function(Obj, cb){
	//Find service that credentials are being created for.
	R({service:{code:Obj.authorization.service}}, function(err, service){
		if(err){return cb(err, Obj);}	
		
		//Find permission code
		R({access:{type: Obj.authorization.access.type, level:Obj.authorization.access.level}}, function(err, access){
			if(err){return cb(err, Obj);}	
			
			var serviceAccess = {service:service, access:access};
			
			return cb(null, serviceAccess);
		});
	});
};

var emailExistWithSocial = function(Obj, Obj2, user, cb){
	var socialSearch = {};
	socialSearch = U.social.getSearchFields(Obj);
	socialSearch.user = user.id;
	//if social and user exist for another service: add service
	R({social:socialSearch},function(err,social){
		if(err){return cb({type:'service_auth_request'}, Obj);}
		
		var newAuth = {id:user.id};
		newAuth.authorization =	{
			 service:Obj2.service.id, 
			 access:Obj2.access.id};
		newAuth.social = Obj.social;
		newAuth.social.service = Obj2.service.id;
		newAuth.social.user = user.id;
		
		C(newAuth, function(err, authorization){
			if(err){return cb(err, Obj);}
			
			return cb(null, user);
		});
	});	
};

var emailExist = function(Obj, Obj2, cb){
	if(err.type == 'email_exist'){
		// Is user registered to this service? Get Id first.
		R.user.get({email:Obj.credentials.email},function(err,user){
			if(err){return cb(err, Obj);}
			
			R({authorization:{user:user.id, service:Obj2.service.id}},function(err,auth){
				if(!err){
					//if yes: check if social exist and if not send 'forgot_account_login'
					if(Obj.social){
						emailExistWithSocial(Obj, Obj2, user, function(err, user){
							if(err){return cb(err, Obj);}
							
							return cb(null, user);
						});
					} else {
						return cb({type:'forgot_account_login'}, Obj);
					}
				} else {
					if(Obj.social){
						emailExistWithSocial(Obj, Obj2, user, function(err, user){
							if(err){return cb(err, Obj);}
							
							return cb(null, user);
						});
					} else {
						return cb({type:'service_auth_request'}, Obj);
					}
				}
			});
		});
	} else {return cb(err, Obj);}	
};

module.exports.create = function(Obj, cb){
	if(Obj){
		if(Obj.credentials){
			serviceAuthDetail(Obj, function(err, serviceAccess){
				if(err){return cb(err, Obj);}	
				
				//Create account for this service and user.
				Obj.authorization.access = serviceAccess.access.id;
				Obj.authorization.service = serviceAccess.service.id;
				
				C(Obj, function(err, user){
					if(err.type == 'email_exist'){
						emailExist(Obj, serviceAccess, function(err, user){
							if(err){return cb(err, Obj);}	
							R({id:user.id}, function(err, returnUser){
								if(err){return cb(err, Obj);}	
								
								return cb(null, user);								
							});
						});
					} else {return cb(err, Obj);}	

				    if(user){
			    		// When new credentials are created
						R({authorization:{user:user.id}},function(err, auths){
							if(err){return cb(err, Obj);}
							
							user.authorizations = [];
							user.authorizations = auths;
							
							if(Obj.social){
								var setSocial = {social:{}};
								setSocial.id = user.id;
								setSocial.social = Obj.social;
								setSocial.social.service = serviceAccess.service.id;

								C(setSocial, function(err, social){
									if(err){return cb(err, null);}
		
									user.social = social;							
									return cb(null, user);					
								});
							} else {
								return cb(null, user);									
							}
							
						});    
				    } else {
			    		return cb('!Error in creating.', Obj);
			    	}
	    		});
			});
		} else if (Obj.authorization){ 
			serviceAuthDetail(Obj, function(err, serviceAccess){
				if(err){return cb(err, Obj);}	

				//Create account for this service and user.
				Obj.authorization.access = serviceAccess.access.id;
				Obj.authorization.service = serviceAccess.service.id;
				if(Obj.social){Obj.social.service = serviceAccess.service.id;}
				
				if(!Obj.id){
					R.user.get({email:Obj.email},function(err, credentials){
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
    	} else if (Obj.social) {
    		R({service:{code:Obj.social.service}}, function(err, service){
    			if(err){return cb(err, Obj);}
    			
    			Obj.social.service = service.id;
    			
				if(!Obj.id){
					R.user.get({email:Obj.email},function(err, credentials){
						if(err){return cb(err, Obj);}
						 
						Obj.id = credentials.id;

						C(Obj,function(err,user){
							if(err){return cb(err, user);}
							
							return cb(null, user);
						});		
					});
				} else {
					C(Obj,function(err,user){
						if(err){return cb(err, user);}
						
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
