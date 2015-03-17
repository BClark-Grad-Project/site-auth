var User = require('./../config').user;
var uuid = require('node-uuid');

var getErrorField = function(err){
	var field = err.message.split('.$')[1];
	
	field = field.split(' dup key')[0];
	field = field.substring(0, field.lastIndexOf('_')); 
	
	return field;
};

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
        	if(err.code == 11000 || err.code == 11001){
        		var field = getErrorField(err);
        		if(field == 'email'){
        			return cb({type:'email_taken'}, user);
        		} else if(field == 'alias'){
        			return cb({type:'alias_taken'}, user);
        		} else {
        			return cb(err, user);
        		}
        	}
        } else {
        	return cb(null, userObj.getData());
        }
    });
};
