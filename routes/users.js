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

module.exports = router;