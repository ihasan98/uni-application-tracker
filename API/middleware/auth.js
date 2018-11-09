const 	middlewareObj 	= {}, // All the middleware goes here.
		passport 	= require("passport");

//If the user is logged in.
middlewareObj.isLoggedInRoute = function(req, res, next) {
	passport.authenticate("jwt", function(err, user){
		if (err) { 
			return res.status(500).json(err);
		}
		else if (user) {
			return next(); // We found the user, therefore we're logged in
		}
		return res.status(401).json({err: "User not logged in or not found!"});
	})(req, res, next);
};

//If the user making the request is an admin.
middlewareObj.isAdminRoute 	= function(req, res, next) {
	passport.authenticate("jwt", function(err, user){
		console.log(user);
		if (err) { 
			return res.status(500).json(err);
		}
		else if (user.isAdmin) {
			return next(); // We found the user, and they're an admin
		}
		return res.status(401).json({err: "User not found or is not admin!"});
	})(req, res, next);
};

//If the user making the request is modifying their own route (or it's an admin).
middlewareObj.isCurrentUser 	= function(req, res, next) {
	passport.authenticate("jwt", function(err, user){
		console.log(req.params.user_id);
		console.log(user._id);
		if (err) { 
			return res.status(500).json(err);
		}
		else if (user._id.toString() === req.params.user_id || user.isAdmin) {
			return next(); // We found the user, and they're either an admin or they're modifying their own route
		}
		return res.status(401).json({err: "User not found or unauthorized!"});
	})(req, res, next);
};

module.exports 			= middlewareObj;