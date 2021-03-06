var Social = require('./../config').social;

module.exports.get = function(Obj, cb){
	Social
		.findOne(Obj)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb({type:'!Notthing Found : Social'}, null);}

			return cb(null, data.getData());
		});	
};

module.exports.verify = function(Obj, cb){ 
	var search = {};

	if(Obj.facebook.id){
		search = {'facebook.id': Obj.facebook.id};
	} else if(Obj.linkedin.id){
		search = {'linkedin.id': Obj.linkedin.id};
	} else if(Obj.gplus.id){
		search = {'gplus.id': Obj.gplus.id};
	}
	
	Social
		.findOne(search)
		.exec(function(err, data){
			if(err){return cb(err, null);}
			if(!data){return cb({type:'!Not found: Social Verify'}, null);}

			return cb(null, data.getUserId());
		});	
};