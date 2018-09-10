// Importing the required packages
const express 		= require("express"),
	  router 		= express.Router(),
	  helpers 		= require("../helpers/users");

router.route("/")
.get(helpers.getsUsers)
.post(helpers.createUser)

router.route("/:user_id")
.get(helpers.getUser)
.put(helpers.putUser)
.delete(helpers.deleteUser)

module.exports = router;