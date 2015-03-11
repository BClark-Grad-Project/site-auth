var Social = require('./../config').social;

module.exports = function(id, cb){
	Social
		.find()
		.remove({_id: id})
		.exec(function(err){
			if(err){return cb(err, null);}
			
			cb(null, 'Deleted');
		});
};