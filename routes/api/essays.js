// Importing the required packages
const express 		= require("express"),
	  router 		= express.Router(),
	  helpers 		= require("../helpers/essays");

router.route("/")
.get(helpers.getsEssays)
.post(helpers.createEssay)

router.route("/:uni_id")
.get(helpers.getEssay)
.put(helpers.putEssay)
.delete(helpers.deleteEssay)

module.exports = router;