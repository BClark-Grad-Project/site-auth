var mongo  = require('mongoose');

var ServiceSchema = mongo.Schema({
    code:      {type: String, lowercase: true, required: true, sparse: true, unique:true},
    name:      {type: String, lowercase: true, required: true, sparse: true, unique:true}
});

ServiceSchema.methods.getData = function(){
	return {
	  id:         this._id,
	  code:		  this.code,
	  name:		  this.name
	};
};

module.exports = ServiceSchema;
