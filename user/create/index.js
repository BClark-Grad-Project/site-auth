// Index of create
var User = require('./user');
var Detail = require('./user-detail');
var Contact = require('./user-contact');

module.exports.user = User;
module.exports.detail = Detail;
module.exports.contact = Contact;
module.exports.buildContacts = function(contactsObj, cb){
	var j = 0;
	var contacts = [];
	for(i in contactsObj){
		Contact(contactsObj[i], function(err, contact){
			if(err){return cb(err, null);}
			contacts.push(contact.id);
			if(j == contacts.length){return cb(null, contacts);}
			j++;
		});
	}
};