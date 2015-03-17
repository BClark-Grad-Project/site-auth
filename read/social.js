var Social = require('./../config').social;

module.exports.get = function(Obj, cb){
	Social
		.findOne(Obj)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No Detail', null);}

			return cb(null, data.getData());
		});	
};

module.exports.verify = function(Obj, cb){ 
	var search = {};

	if(Obj.facebook){
		search = {'facebook.id': Obj.facebook.id};
	} else if(Obj.linkedin){
		search = {'linkedin.id': Obj.linkedin.id};
	} else if(Obj.gplus){
		search = {'gplus.id': Obj.gplus.id};
	}
	
	console.log(search);
	Social
		.findOne(search)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb('!No Detail', null);}
			console.log(data);

			return cb(null, data.getUserId());
		});	
};