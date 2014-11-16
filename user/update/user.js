var User = require('./../models/user');

module.exports = function(updateData, cb){
	var id = updateData.id;
	delete updateData.id;
	
	User.update({_id:id}, updateData, {}, function(err, numberAffected, rawResponse){
		if(err){return cb(err, null);}
		return cb(null, 'Success');
	});
};