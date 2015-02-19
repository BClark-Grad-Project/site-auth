var Access = require('./../config').access;

module.exports = function(search, updateData, cb){	
	Access.findOneAndUpdate(search, updateData, {}, function(err, data){
		if(err){return cb(err, null);}
		return cb(null, data.getData());
	});
};