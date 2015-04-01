var Service = require('./../config').service;

module.exports = function(Obj, cb){
	Service
		.findOne(Obj)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb({type:'!No Detail'}, null);}

			return cb(null, data.getData());
		});	
};