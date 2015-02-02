var User = require('./../config').user;

module.exports = function(updateData, cb){
	var id = updateData.id;

	User.findOneAndUpdate({_id:id}, updateData, {}, function(err, user){
		if(err){return cb(err, null);}
		return cb(null, user.getData());
	});
};
