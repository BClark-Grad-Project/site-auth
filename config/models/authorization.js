var mongo  = require('mongoose');

var AuthorizationSchema = mongo.Schema({
    user:     {type: mongo.Schema.Types.ObjectId,
			   ref:  'User'},
	access:   {type: mongo.Schema.Types.ObjectId,
			   ref:  'Access'},
	service:   {type: mongo.Schema.Types.ObjectId,
			   ref:  'Service'},
	active:   {type:String, 'default': true}
});

AuthorizationSchema.methods.getData = function(){
	return {
	  access:	  this.access,
	  service:	  this.service,
	  active:	  this.active
	};
};

module.exports = AuthorizationSchema;
