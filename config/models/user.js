var mongo  = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongo.Schema({
    email:      {type: String, lowercase: true, required: true, sparse: true, unique:true},
    alias:      {type: String, lowercase: true, required: true, sparse: true, unique:true},
    password:   {type: String, required: true},
    active:     {type: Boolean, required: true}
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.validPassword = function(password) {	
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getData = function(){
	return {
	  id:         this._id,
	  credentials:{
  	    email:      this.email,
	    alias:      this.alias,
	    active:     this.active}
	};
};

module.exports = UserSchema;
