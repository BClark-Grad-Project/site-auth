var mongo  = require('mongoose');

// I have included a access level but will not be using it for this scrum cycle.
var SocialSchema = mongo.Schema({
	user: {type: mongo.Schema.Types.ObjectId, ref: 'User'},
	service: {type: mongo.Schema.Types.ObjectId, ref: 'Service'},
    facebook: {
    	id:    {type: String, unique:true}
    },
    gplus:    {
    	id:    {type: String, unique:true},
    	token: {type: String, unique:true}
    },
    linkedin: {
    	id:    {type: String, unique:true},
    	token: {type: String, unique:true}
    }
    
});

SocialSchema.methods.getData = function(){
	return {
	  id:       this._id,
	  service:  this.service,
	  facebook: this.facebook,
	  gplus:    this.gplus,
	  linkedin: this.linkedin
	};
};

module.exports = SocialSchema;
