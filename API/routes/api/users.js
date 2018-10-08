const 	express			= require("express"),
		router			= express.Router(),
		users			= require("../../helpers/users"),
		auth			= require("../../middleware/auth");

router.route("/")
.get(auth.isAdminRoute, users.getsUsers)
.post(auth.isAdminRoute, users.createUser);

router.route("/:user_id")
.get(auth.isCurrentUser, users.getUser)
.put(auth.isCurrentUser, users.putUser)
.delete(auth.isAdminRoute, users.deleteUser);

module.exports = router;