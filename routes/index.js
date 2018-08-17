// Requiring the correct packages.
const express			= require("express"),
	  router			= express.Router(),
	  passport 			= require("passport");


// Route for the landing page.
router.get("/", function(req, res) {
	res.redirect("/users");
});

router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	}));

router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "Successfully Logged Out!");
	res.redirect("/login");
});

module.exports = router;