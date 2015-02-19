var mongo  = require('mongoose');

// I have included a access level but will not be using it for this scrum cycle.
var AccessSchema = mongo.Schema({
    type:      {type: String, lowercase: true, required: true, sparse: true, unique:true},
    level:     {type: Number}
});

AccessSchema.methods.getData = function(){
	return {
	  id:         this._id,
	  type:		  this.type,
	  level:	  this.level
	};
};

module.exports = AccessSchema;
