const middlewareObj 	= {}; // All the middleware goes here.


middlewareObj.isLoggedInRoute = function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Please Login First!");
		res.redirect("/login");
	}
};

middlewareObj.isAdminRoute 	= function isAdminRoute(req, res, next) {
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

middlewareObj.hasAccessRoute 	= function hasAccessRoute(req, res, next) {
	if(req.isAuthenticated()) {
		if(req.user.isAdmin) {
			next();
		} else if(req.user._id.equals(req.params.user_id)) {
			next();
		} else {
			req.flash("error", "Sorry you cannot access that page!");
			res.redirect("/users");
		}
	} else {
		req.flash("error", "Please Login First!");
		res.redirect("/login");
	}
};

middlewareObj.isAdmin = function isAdmin(req, res) {
	return req.isAuthenticated() && req.user.isAdmin;
};

module.exports 			= middlewareObj;
