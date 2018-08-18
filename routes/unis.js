var express	= require("express"),
	router	= express.Router(),
	db		= require("../models/unis");

// root routes
router.get("/", function (req, res) {
	db.find(function (err, unis) {
		if (err) {
			res.redirect("/");
			console.log("An error occured querying the database for universities.");
		} else {
			res.render("unis/index", { unis: unis } ); 
		}
	});
});

router.post("/", function (req, res) {
	var newUni = req.body.unis;
	db.create(newUni, function (err, createdUser) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/unis");
		}
	});
});

// /new routes
router.get("/new", function (req, res) {
	res.render("unis/new");
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