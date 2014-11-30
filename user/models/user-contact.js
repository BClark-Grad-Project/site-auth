var mongo = require('mongoose');

var UserContactSchema = mongo.Schema({
    user:     {type: mongo.Schema.Types.ObjectId,
               ref:  'User'},
    type:     {type: String},
    phone:    {type: String},
    carrier:  {type: String},
    ext:      {type: String},
    addr:     {type: String},
    addr_2:   {type: String},
    city:     {type: String},
    state:    {type: String},
    zip:      {type: String},
    country:  {type: String}
});

UserContactSchema.methods.getData = function(){
	return {
		id:		  this._id,
	    type:     this.type,
	    phone:    this.phone,
	    carrier:  this.carrier,
	    ext:      this.ext,
	    addr:     this.addr,
	    addr_2:   this.addr_2,
	    city:     this.city,
	    state:    this.state,
	    zip:      this.zip,
	    country:  this.country
	};
};

module.exports = mongo.model('UserContact', UserContactSchema);