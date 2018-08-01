// Importing the correct packages
var express 	= require("express"),
	router		= express.Router();

// Importing the User mongoose model.
var User 		= require("../models/user");

// INDEX Route
router.get("/", function(req, res) {
	User.find({}, function(err, users) {
		if(err) {
			res.redirect("/");
			console.log("Error in loading users!");
		} else {
			res.render("users/index", {users: users});
		}
	});
});

// NEW and CREATE Routes
router.get("/new", function(req, res) {
	res.render("users/new");
});

router.post("/", function(req, res) {
	var newUser = req.body.user;
	User.create(newUser, function(err, createdUser) {
		if(err){
			console.log(err);
		} else {
			res.redirect("/users");
		}
	});
});

//SHOW Route
router.get("/:user_id", function(req, res) {
	User.findById(req.params.user_id, function(err, foundUser) {
		if(err || !foundUser) {
			console.log(err);
			req.flash("error", "User not found!");
			res.redirect("/users")
		} else {
			res.render("users/show", {user: foundUser});
		}
	});
});

//EDIT and UPDATE Routes
router.get("/:user_id/edit", function(req, res) {
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

router.put("/:user_id", function(req, res) {
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
router.get("/:user_id/add", function (req, res) {
	User.findById(req.params.user_id, function (err, foundUser) {
		if (err || !foundUser) {
			console.log(err);
			req.flash("error", "User not found!");
			res.redirect("/users")
		} else {
			res.render("users/show", { user: foundUser });
		}
	});
});

//DESTROY Routes
router.delete("/:user_id", function(req, res) {
	User.findByIdAndRemove(req.params.user_id, function(err) {
		if(err) {
			req.flash("error", "Error in deleting user!");
			console.log("Error in deleting user: " + err);
			res.redirect("/users");
		} else {
			req.flash("success", "Successfully deleted user!");
			res.redirect("/users");
		}
	})
})
module.exports = router;