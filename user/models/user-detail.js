var mongo = require('mongoose');

var UserDetailSchema = mongo.Schema({
    user:         {type:  mongo.Schema.Types.ObjectId,
                   ref:   'User'},
    contact:     [{type:  mongo.Schema.Types.ObjectId,
                   ref:   'UserContact'}],
    first:        {type: String, required: true},
    middle:       {type: String, required: true},  // Preserving ability for a person to add multiple middle names.
    last:         {type: String, required: true},
    birth:        {type:   Date},
    gender:       {type:   String},
    joined:		  {type: Date, default: Date.now()}    
});

UserDetailSchema.methods.getData = function(){
	return {
		id: 	this._id,
	    user:	this.user,
	    contact:this.contact,
	    first:  this.first,
	    middle: this.middle,
	    last:   this.last,
	    birth:	this.birth,
	    gender:	this.gender,
	    joined: this.joined
	};
};

module.exports = mongo.model('UserDetail', UserDetailSchema);