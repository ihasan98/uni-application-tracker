const 	express			= require("express"),
		router			= express.Router(),
		unis			= require("../../helpers/unis"),
		essays			= require("../../helpers/essays"),
		auth			= require("../../middleware/auth");
		
router.route("/")
.get(auth.isLoggedInRoute(), unis.getsUnis)
.post(auth.isLoggedInRoute(), unis.createUni);

router.route("/:uni_id")
.get(auth.isLoggedInRoute(), unis.getUni)
.post(auth.isLoggedInRoute(), essays.createEssay)
.put(auth.isLoggedInRoute(), unis.putUni)
.delete(auth.isLoggedInRoute(), unis.deleteUni);

module.exports = router;