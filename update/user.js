var User = require('./../config').user;

module.exports = function(search, updateData, cb){

	User.findOneAndUpdate(search, updateData, {}, function(err, user){
		if(err){return cb(err, null);}
		return cb(null, user.getData());
	});
};
