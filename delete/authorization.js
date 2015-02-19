var Authorization = require('./../config').authorization;

//This is a fake delete.  Instead we set "active" to false.
module.exports = function(Obj, cb){
	Authorization(Obj, {active:false}, function(err, detail){
		if(err){return cb(err, null);}
		
		cb(null, 'Deleted');
	});
};