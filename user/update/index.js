// Index of update

var User = require('./user');
var Detail = require('./user-detail');
var Contact = require('./user-contact');

module.exports.user = User;
module.exports.detail = Detail;
module.exports.contact = Contact;
module.exports.contactList = function(contactsObj, cb){
	var j = 0;
	for(i in contactsObj){
		Contact(contactsObj[i], function(err, contact){
			if(err){return cb(err, null);}
			if(j == contactsObj.length){return cb(null, 'Success');}
			j++;
		});
	}
};