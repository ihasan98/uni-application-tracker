// Importing the required packages
const 	express			= require("express"),
		router			= express.Router(),
		essays			= require("../../helpers/essays"),
		auth			= require("../../helpers/auth");

router.route("/:essay_id")
.get(auth.isLoggedInRoute(), essays.getEssay)
.put(auth.isLoggedInRoute(), essays.putEssay)
.delete(auth.isLoggedInRoute(), essays.deleteEssay);

module.exports = router;