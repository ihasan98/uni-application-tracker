const 	express		= require("express"),
		router		= express.Router({mergeParams: true}),
		middleware 	= require("../middleware"),
		db			= require("../models/unis"),
		User 		= require("../models/user"),
		Essay 		= require("../models/essay");

// INDEX Routes
router.get("/", middleware.hasAccessRoute, function (req, res) {
	User.findById(req.params.user_id).populate("unis").exec(function (err, foundUser) {
		if (err) {
			res.redirect("/");
			console.log("An error occured querying the database for universities.");
		} else {
			Essay.populate(foundUser, 'unis.essays', function(err, unis) {
				res.render("unis/index", { unis: foundUser.unis } ); 
			});	
		}
	});
});


// NEW and CREATE Routes
router.get("/new", middleware.isLoggedInRoute, function (req, res) {
	res.render("unis/new");
});

router.post("/", middleware.isLoggedInRoute, function (req, res) {
	const newUni = req.body.unis;
	db.create(newUni, function (err, createdUni) {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			User.findById(req.user._id, function(err, user) {
				if(err) {
					req.flash("error", "Something went wrong.");
					console.log(err);
					res.redirect("back");
				} else {
					user.unis.push(createdUni);
					user.save(function(err, updUser) {
						req.flash("success", "Successfully added " + createdUni.name);
						res.redirect("/users/" + updUser._id +"/unis");
					});
				}
			});
		}
	});
});

// /_id routes
router.get("/:id", function (req, res) {
	db.findById(req.params.id, function (err, uni) {
		if (err) {
			console.log(err);
			req.flash("error", "Error retrieving university!");
			res.redirect("/unis");
		} else {
			res.render("unis/show", { uni: uni });
		}
	});
});

router.put("/:id", function (req, res) {
	db.findById(req.params.id, function (err, uni) {
		if (err) {
			console.log(err);
			req.flash("error", "Error retrieving university!");
			res.redirect("/unis");
		} else {
			uni.essays.push(req.body);
			uni.save(function (err) {
				if (err) throw err;
			});
			res.redirect("/unis/" + req.params.id);
		}
	});
});

// /_id/add routes
router.get("/:id/add", function (req, res) {
	db.findById(req.params.id, function (err, uni) {
		if (err) throw err;
		res.render("unis/add_essay", { uni: uni });
	});
	
});

module.exports = router;