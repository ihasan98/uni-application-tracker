const User 				= require("../models/user");

const middlewareObj 	= {}; 						// All the middleware goes here.


middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Please Login First!");
		res.redirect("/login");
	}
};

middlewareObj.isAdmin 	= function isAdmin(req, res, next) {
	if(req.isAuthenticated()) {
		if(req.user.isAdmin) {
			next();
		} else {
			req.flash("error", "Sorry you cannot access that page!");
			res.redirect("back");
		}
	} else {
		req.flash("error", "Please Login First!");
		res.redirect("/login");
	}
};

module.exports 			= middlewareObj;
