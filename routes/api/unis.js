// Importing the required packages
const express 		= require("express"),
	  router 		= express.Router(),
	  helpers 		= require("../helpers/unis");

router.route("/")
.get(helpers.getsUnis)
.post(helpers.createUnis)

router.route("/:uni_id")
.get(helpers.getUni)
.put(helpers.putUni)
.delete(helpers.deleteUni)

module.exports = router;