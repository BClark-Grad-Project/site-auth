var User = require('./../config').user;

module.exports = function(user, cb){
	var active = user.active ? user.active : true;
	var type     = user.type   ? user.type   : 'general';	
	var hasher = new User();
	var password = hasher.generateHash(user.password);
	
	var userObj  = new User({
	    email:      user.email,
	    alias:      user.alias,
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
