var Authorization = require('./../config').authorization;

module.exports = function(Obj, cb){
	Authorization
		.find(Obj)
		.populate('service', 'code name')
		.populate('access', 'type level')
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data[0]){return cb({type:'!Nothing Found'}, null);}

			for(var i in data){
				delete data[i]._id;
			}
			
			return cb(null, data);
		});	
};