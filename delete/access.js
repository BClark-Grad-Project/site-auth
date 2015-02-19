var Access = require('./../config').access;

module.exports = function(id, cb){
	Access
		.find()
		.remove({_id: id})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};
