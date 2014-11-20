var UserDetail = require('./../models/user-detail');

module.exports = function(detail, cb){
	if(!detail.user){return cb('Missing User Object', null);}

    var first     = detail.first   ? detail.first   : undefined;
    var middle    = detail.middle  ? detail.middle  : undefined;
    var last 	  = detail.last    ? detail.last    : undefined;
    var contact   = detail.contact ? detail.contact : undefined;
    var birth  	  = detail.birth   ? detail.birth   : undefined;
    var gender 	  = detail.gender  ? detail.gender  : undefined;
	var detailObj = new UserDetail({
	    user:	 detail.user,
	    first:   first,
	    middle:  middle,
	    last:    last,
	    contact: contact,
	    birth:	 birth,
	    gender:	 gender
	});	
	
	detailObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, detailObj.getData());
    });
};

/*
 * Detail model is submitted as Object.
   {user:	 user,      | Required
	first:   first,     | Optional
	middle:  middle,    | Optional
	last:    last,      | Optional
	contact: contact,   | Optional
	birth:	 birth,     | Optional
	gender:	 gender}	| Optional
 */