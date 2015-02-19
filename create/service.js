var Service = require('./../config').service;

module.exports = function(Obj, cb){
    if(!Obj.name){ return cb('!No Object Value', null);}
    if(!Obj.code){ return cb('!No Object Value', null);}

	var createObj = new Service({
	    name: Obj.name,
	    code: Obj.code
	});	
	
	createObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, createObj.getData());
    });
};