// Importing the correct packages
const   express 	= require("express"),
		router		= express.Router(),
		middleware 	= require("../middleware");

// Importing the User mongoose model.
const  	User 		= require("../models/user");

// INDEX Route
router.get("/", middleware.isLoggedInRoute, function (req, res) {
	if (middleware.isAdmin(req, res)) {
		User.find({}, function (err, users) {
			if (err) {
				res.redirect("/");
				console.log("Error in loading users!");
			} else {
				res.render("users/admin_index", { users: users });
			}
		});
	}
	else {
		res.redirect("users/" + req.user._id + "/unis");
	}
});

// NEW and CREATE Routes
router.get("/new", middleware.isAdminRoute, function(req, res) {
	res.render("users/new");
});

router.post("/", middleware.isAdminRoute, function(req, res) {
	User.register(req.body.user, req.body.password, function(err, createdUser) {
		if(err){
			console.log(err);
		} else {
			req.flash("success", "Successfully created user: " + createdUser.fullname);
			res.redirect("/users");
		}
	});
});

//SHOW Route
router.get("/:user_id", middleware.isAdminRoute, function(req, res) {
	User.findById(req.params.user_id, function(err, foundUser) {
		if(err || !foundUser) {
			console.log(err);
			req.flash("error", "User not found!");
			res.redirect("/users");
		} else {
			res.render("users/show", {user: foundUser});
		}
	});
});

//EDIT and UPDATE Routes
router.get("/:user_id/edit", middleware.isAdminRoute, function(req, res) {
	User.findById(req.params.user_id, function(err, foundUser) {
		if(err || !foundUser) {
			req.flash("error", "User not found!");
			console.log("Error in finding user to update: " + err);
			res.redirect("/users");
		} else {
			res.render("users/edit", {user: foundUser});
		}
	});
});

router.put("/:user_id", middleware.isAdminRoute, function(req, res) {
	User.findByIdAndUpdate(req.params.user_id, req.body.user, function(err, updatedUser) {
		if(err || !updatedUser) {
			req.flash("error", "User not found!");
			console.log("Error in updating user: " + err);
			res.redirect("/users");
		} else {
			req.flash("success", "Successfully updated " + updatedUser.fullname);
			res.redirect("/users/" + req.params.user_id);
		}
	});
});

//ADD Route
router.get("/:user_id/add", middleware.isAdminRoute, function (req, res) {
	User.findById(req.params.user_id, function (err, foundUser) {
		if (err || !foundUser) {
			console.log(err);
			req.flash("error", "User not found!");
			res.redirect("/users");
		} else {
			res.render("users/show", { user: foundUser });
		}
	});
});

//DESTROY Routes
router.delete("/:user_id", middleware.isAdminRoute, function (req, res) {
	User.findByIdAndRemove(req.params.user_id, function (err) {
		if (err) {
			req.flash("error", "Error in deleting user!");
			console.log("Error in deleting user: " + err);
			res.redirect("/users");
		} else {
			req.flash("success", "Successfully deleted user!");
			res.redirect("/users");
		}
	});
});
module.exports = router;