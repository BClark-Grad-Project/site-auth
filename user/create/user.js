var User = require('./../models/user');

module.exports = function(user, cb){
	if(!user.password){return cb('Missing User Password', null);}
	if(!user.email){return cb('Missing User Email', null);}
	if(!user.name){return cb('Missing User Screen Name', null);}
	
	var hasher = new User();
	var password = hasher.generateHash(user.password);
	var type     = user.type   ? user.type   : undefined;
	var active   = user.active ? user.active : false;
	
	var userObj  = new User({
	    email:      user.email,
	    name:       user.name,
	    password:   password,
	    type:       type,
	    active:     active
	});
	
	userObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, userObj.getData());
    });
};

/*
 * User model is submitted as JSON Object.
 * {email:    email,		| Required
 *  name:     name,		    | Required
 *  password: password,		| Required
 *  type:     type,			| Optional
 *  active:   active}		| Optional
 */