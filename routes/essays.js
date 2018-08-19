const 	express		= require("express"),
		router		= express.Router({mergeParams: true}),
		middleware 	= require("../middleware"),
		Uni			= require("../models/unis"),
		User 		= require("../models/user"),
		Essay 		= require("../models/essay");

// NEW and CREATE Routes 
router.get("/new", middleware.hasAccessRoute, function(req, res) {
	Uni.findById(req.params.uni_id, function(err, uni) {
		if(err || !uni) {
			console.log(err);
			req.flash("error", "No university found!");
			res.redirect("/users/" + req.user._id +"/unis");
		} else {
			res.render("essays/new", {uni : uni});
		}
	});
});

router.post("/", middleware.hasAccessRoute, function(req, res) {
	const newEssay 	= req.body.essay;
	newEssay.author = req.params.user_id;
	Essay.create(newEssay, function(err, essay) {
		if(!err) {
			Uni.findById(req.params.uni_id, function(err, uni) {
				if(!err) {
					uni.essays.push(essay);
					uni.save(function(err, updUni) {
						if(!err) {
							req.flash("success", "Successfully Added Essay to " + updUni.name);
							res.redirect("/users/" + req.user._id +"/unis");
						}
					});
				}
			});
		}
	});
});


module.exports	= router;