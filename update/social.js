var Social = require('./../config').social;

module.exports = function(search, updateData, cb){	
	Social.findOneAndUpdate(search, updateData, {}, function(err, data){
		if(err){return cb(err, null);}
		return cb(null, data.getData());
	});
};