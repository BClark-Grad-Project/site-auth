var User = require('./../models/user');

module.exports = function(user, cb){
	if(user.email){return cb('Missing User Email', null);}
	if(user.password){return cb('Missing User Password', null);}
	
	var password = User.generateHash(user.password);
	var type     = user.type   ? user.type   : undefined;
	var active   = user.active ? user.active : false;
	var userObj  = new User({
	    email:      user.email,
	    password:   password,
	    type:       type,
	    active:     active
	});
	
	userObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
    });
	return cb(null, userObj.getData());
};

/*
 * User model is submitted as JSON Object.
 * {email:    email,		| Required
 *  password: password,		| Required
 *  type:     type,			| Optional
 *  active:   active}		| Optional
 */