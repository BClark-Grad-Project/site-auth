var Authorization = require('./../config').authorization;

module.exports = function(Obj, cb){
	Authorization
		.findOne(Obj)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No Detail', null);}

			return cb(null, data.getData());
		});	
};