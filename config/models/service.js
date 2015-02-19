var mongo  = require('mongoose');

var ServiceSchema = mongo.Schema({
    name:      {type: String, lowercase: true, required: true, sparse: true, unique:true}
});

ServiceSchema.methods.getData = function(){
	return {
	  id:         this._id,
	  name:		  this.name
	};
};

module.exports = ServiceSchema;
