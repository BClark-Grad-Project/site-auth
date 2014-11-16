var UserDetail = require('./../models/detail');

module.exports = function(detail, cb){
	if(!detail.user){return cb('Missing User Object', null);}

    var contact   = detail.contact ? detail.contact : undefined;
    var birth  	  = detail.birth   ? detail.birth   : undefined;
    var gender 	  = detail.gender  ? detail.gender  : undefined;
	var detailObj = new UserDetail({
	    user:	 detail.user,
	    contact: contact,
	    birth:	 birth,
	    gender:	 gender
	});	
	
	detailObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
    });
	return cb(null, detailObj.getData());
};

/*
 * Detail model is submitted as JSON Object.
   {user:	 user,      | Required
	contact: contact,   | Optional
	birth:	 birth,     | Optional
	gender:	 gender}	| Optional
 */