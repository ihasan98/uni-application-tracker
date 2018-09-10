// Importing the required packages
const 	express			= require("express"),
		router			= express.Router(),
		users			= require("./users"),
		unis			= require("./unis"),
		essays			= require("./essays");

router.use("/users/:user_id/unis/:uni_id/essays/", essays);
router.use("/users/:user_id/unis", unis);
router.use("/users", users);

module.exports = router;