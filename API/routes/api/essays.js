// Importing the required packages
const 	express			= require("express"),
		router			= express.Router(),
		essays			= require("../../helpers/essays");

router.route("/:essay_id")
.get(essays.getEssay)
.put(essays.putEssay)
.delete(essays.deleteEssay);

module.exports = router;