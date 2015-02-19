var Service = require('./../config').service;

module.exports = function(search, updateData, cb){	
	Service.findOneAndUpdate(search, updateData, {}, function(err, data){
		if(err){return cb(err, null);}
		return cb(null, data.getData());
	});
};