const 	express			= require("express"),
		router			= express.Router(),
		users			= require("../../helpers/users");

router.route("/")
.get(users.getsUsers)
.post(users.createUser);

router.route("/:user_id")
.get(users.getUser)
.put(users.putUser)
.delete(users.deleteUser);

module.exports = router;