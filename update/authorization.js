var Authorization = require('./../config').authorization;

module.exports = function(search, updateData, cb){	
	Authorization.findOneAndUpdate(search, updateData, {}, function(err, data){
		if(err){return cb(err, null);}
		return cb(null, data.getData());
	});
};