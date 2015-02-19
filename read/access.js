var Access = require('./../config').access;

module.exports = function(Obj, cb){
	Access
		.findOne(Obj)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No Detail', null);}

			return cb(null, data.getData());
		});	
};