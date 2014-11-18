var UserDetail = require('./../models/user-detail');

module.exports.byId = function(id, cb){
	UserDetail
		.find()
		.remove({_id: id})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};

module.exports.byUser = function(user, cb){
	UserDetail
		.find()
		.remove({user: user})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};