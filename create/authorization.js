var Authorization = require('./../config').authorization;

module.exports = function(Obj, cb){
    if(!Obj.user){ return cb('!No Object value', null);}
    if(!Obj.service){ return cb('!No Object value', null);}
    if(!Obj.access){ return cb('!No Object value', null);}
    
	var createObj = new Authorization({
		user: Obj.user,
		service: Obj.service,
		access: Obj.access
	});	
	
	createObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, createObj.getData());
    });
};