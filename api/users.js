// Importing the required packages
const express		= require("express"),
	  router		= express.Router(),
	  middleware	= require("../middleware"),
	  userDb		= require("../models/user");

// /users route (returns all users)
router.get("/", middleware.isAdminRoute, function (req, res) {
	userDb.find({}, function (err, users) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(users);
		}
	});
});

router.post("/", middleware.isAdminRoute, function (req, res) {
	userDb.register(req.body.user, req.body.password, function (err, createdUser) {
		if (err) {
			console.log(err);
			req.flash("Could not create user.");
			res.status(500).send; // Send INTERNAL SERVER ERROR
		} else {
			req.flash("success", "Successfully created user: " + createdUser.fullname);
			res.status(200).send; // Send SUCCESS
		}
	});
});

// /users/:user_id route (returns a specific user's details)
// TODO: allow users to access their own info (because right now only admins can access their own info)
router.get("/:user_id", middleware.isAdminRoute, function (req, res) {
	userDb.findById(req.params.user_id, function (err, user) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(user);
		}
	});
});

router.put("/:user_id", middleware.isAdminRoute, function (req, res) {
	userDb.findByIdAndUpdate(req.body.user_id, req.body.user, function (err, user) {
		if (err) {
			console.log(err);
			req.flash("Could not edit user.");
			res.status(500).send; // Send INTERNAL SERVER ERROR
		} else {
			req.flash("success", "Successfully edited user: " + user.fullname);
			res.status(200).send; // Send SUCCESS
		}
	});
});

module.exports = router;