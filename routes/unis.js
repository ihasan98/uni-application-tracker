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

module.exports = router;