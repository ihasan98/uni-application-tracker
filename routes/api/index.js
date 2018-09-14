// Importing the required packages
const 	express			= require("express"),
		router			= express.Router(),
		users			= require("./users"),
		unis			= require("./unis"),
		essays			= require("./essays");

router.use("/essays", essays);
router.use("/unis", unis);
router.use("/users", users);

module.exports = router;