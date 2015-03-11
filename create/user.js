var User = require('./../config').user;
var uuid = require('node-uuid');

module.exports = function(user, cb){
	var active = user.active ? user.active : true;
	var hasher = new User();
	var password = user.password ? user.password : uuid.v4();
	password = hasher.generateHash(password);
	
	var userObj  = new User({
	    email:      user.email,
	    alias:      user.alias,
	    password:   password,
	    active:     active
	});
	
	userObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, userObj.getData());
    });
};
