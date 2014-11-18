var UserDetail = require('./../models/user-detail');

module.exports.byId = function(id, cb){
	UserDetail
		.findOne({_id: id})
		.exec(function(err, detail){
			if(err){return cb(err, null);}
			if(!detail){return cb('No Detail Id: ' + id, null);}

			return cb(null, detail.getData());
		});	
};

module.exports.byUser = function(user, cb){
	UserDetail
		.findOne({user: user})
		.exec(function(err, detail){
			if(err){return cb(err, null);}
			if(!detail){return cb('No Detail for User: ' + user, null);}

			return cb(null, detail.getData());
		});	
};

module.exports.byGender = function(gender, cb){
	UserDetail
		.find({gender: gender})
		.exec(function(err, details){
			if(err){return cb(err, null);}
			if(!details){return cb('No Gender for: ' + gender, null);}
			
			var detailsArray = [];
			for(i in details){
				detailsArray.push(details[i].getData());
			}
			return cb(null, detailsArray);
		});
};