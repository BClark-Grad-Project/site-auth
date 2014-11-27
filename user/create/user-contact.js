var UserContact = require('./../models/user-contact');

module.exports = function(contact, cb){
	if(!contact.type){return cb('Missing Contact Type', null);}
	if(!contact.user){return cb('Missing Contact User', null);}

    var carrier    = contact.carrier ? contact.carrier : undefined;
    var phone      = contact.phone   ? contact.phone   : undefined;
    var ext        = contact.ext     ? contact.ext     : undefined;
    var addr       = contact.addr    ? contact.addr    : undefined;
    var addr_2     = contact.addr_2  ? contact.addr_2  : undefined;
    var city       = contact.city    ? contact.city    : undefined;
    var state      = contact.state   ? contact.state   : undefined;
    var zip        = contact.zip     ? contact.zip     : undefined;
	var contactObj = new UserContact({
	    user:     contact.user,
	    type:     contact.type,
	    carrier:  carrier,
	    phone:    phone,
	    ext:      ext,
	    addr:     addr,
	    addr_2:   addr_2,
	    city:     city,
	    state:    state,
	    zip:      zip
	});	
	
	contactObj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, contactObj.getData());
    });
};

/*
 * Contact model is submitted as JSON Object.
 * {user:     user,		| Required
 *  type:     type,		| Required
 *  phone:    phone,	| Optional
 *  addr:     addr,		| Optional
 *  addr_2:   addr_2,	| Optional
 *  city:     city,		| Optional
 *  state:    state,	| Optional
 *  zip:      zip,		| Optional
 *  country:  country}	| Optional
 */