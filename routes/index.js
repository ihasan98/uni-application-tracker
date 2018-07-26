// Requiring the correct packages.
var express			= require("express"),
	router				= express.Router();


// Route for the landing page.
router.get("/", function(req, res) {
	res.render("landing");
});

module.exports = router;