var mongo  = require('mongoose');

// I have included a access level but will not be using it for this scrum cycle.
var SocialSchema = mongo.Schema({
	user: {type: mongo.Schema.Types.ObjectId, ref: 'User'},
	service: {type: mongo.Schema.Types.ObjectId, ref: 'Service'},
    facebook: {
    	id:    {type: String},
    	token: {type: String}
    },
    gplus:    {
    	id:    {type: String},
    	token: {type: String}
    },
    linkedin: {
    	id:    {type: String}
    }
    
});

SocialSchema.methods.getData = function(){
	return {
	  id:       this._id,
	  user:     this.user,
	  service:  this.service,
	  facebook: this.facebook,
	  gplus:    this.gplus,
	  linkedin: this.linkedin
	};
};

SocialSchema.methods.getUserId = function(){
	return {
	  id:       this.user
	};
};

module.exports = SocialSchema;
