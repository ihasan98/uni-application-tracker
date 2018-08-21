// Importing the required packages
const express = require("express"),
	  router = express.Router(),
	  middleware = require("../middleware"),
	  userDb = require("../models/user");

// /users route (returns all users)
router.get("/users", middleware.isAdminRoute, function (req, res) {
	userDb.find({}, function (err, users) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(users);
		}
	});
});

router.post("/users", middleware.isAdminRoute, function (req, res) {
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

module.exports = router;