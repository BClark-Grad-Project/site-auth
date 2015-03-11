var Social = require('./../config').social;

module.exports = function(Obj, cb){
    if(!Obj.user){ return cb('!No Object: User', null);}

	var createObj = new Social(Obj);	
	
	createObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, createObj.getData());
    });
};