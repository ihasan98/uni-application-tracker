const 	express			= require("express"),
		router			= express.Router(),
		unis			= require("../../helpers/unis"),
		essays			= require("../../helpers/essays");
		
router.route("/")
.get(unis.getsUnis)
.post(unis.createUni);

router.route("/:uni_id")
.get(unis.getUni)
.post(essays.createEssay)
.put(unis.putUni)
.delete(unis.deleteUni);

module.exports = router;