var Access = require('./../config').access;

module.exports = function(Obj, cb){
    if(!Obj.type){ return cb('!No Object value', null);}
    var level     = Obj.name ? Obj.name : 0;
    
	var createObj = new Access({
	    type:  Obj.type,
	    level: level
	});	
	
	createObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, createObj.getData());
    });
};