
module.exports.user = function(req, res, next){
	var type = req.session.user.type;
	
	if(!(type == 'user')){return false;}
	
	return true;
};

module.exports.admin = function(req, res, next){
	var type = req.session.user.type;
	
	if(!(type == 'admin')){return false;}
	
	return true;
};

module.exports.registered = function(req, res, next){
	var type = req.session.user.type;
	
	if(!((type == 'admin') || (type == 'user'))){return false;}
	
	return true;
};