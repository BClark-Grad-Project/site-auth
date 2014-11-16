var UserDetail = require('./../models/detail');

module.exports = function(updateData, cb){
	var id = updateData.id;
	delete updateData.id;
	
	UserDetail.update({_id:id}, updateData, {}, function(err, numberAffected, rawResponse){
		if(err){return cb(err, null);}
		return cb(null, 'Success');
	});
};