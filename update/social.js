var Social = require('./../config').social;

module.exports = function(search, updateData, cb){	
	Social.findOneAndUpdate(search, updateData, {}, function(err, data){
		if(err){return cb(err, null);}
		return cb(null, data.getData());
	});
};

module.exports.getUpdateFields = function(Obj){
	var updateData = {};

	if(Obj.social.facebook.id){
		updateData.facebook = Obj.social.facebook;
	}
	if(Obj.social.linkedin.id){
		updateData.linkedin = Obj.social.linkedin;
	}
	if(Obj.social.gplus.id){
		updateData.gplus = Obj.social.gplus;
	}
	
	return updateData;
};

module.exports.getSearchFields = function(Obj){
	var updateData = {};

	if(Obj.social.facebook.id){
		updateData.facebook = {id: Obj.social.facebook.id};
	}
	if(Obj.social.linkedin.id){
		updateData.linkedin = {id: Obj.social.linkedin.id};
	}
	if(Obj.social.gplus.id){
		updateData.gplus = {id: Obj.social.gplus.id};
	}
	
	return updateData;
};