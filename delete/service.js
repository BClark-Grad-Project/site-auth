var Service = require('./../config').service;

module.exports = function(id, cb){
	Service
		.find()
		.remove({_id: id})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};