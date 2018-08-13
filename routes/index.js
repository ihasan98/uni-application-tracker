// Requiring the correct packages.
const express			= require("express"),
	  router			= express.Router(),
	  passport 			= require("passport");


// Route for the landing page.
router.get("/", function(req, res) {
	if(req.isAuthenticated()) {
		if(req.user.isAdmin) {
			res.redirect("/users");
		} else {
			console.log("Page still needs to be built")
		}
	} else {
		res.redirect("/login");
	}
});

router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	}), function(req,res) {});

router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Successfully Logged Out!");
	res.redirect("/login");
})

module.exports = router;