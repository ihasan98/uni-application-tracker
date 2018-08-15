// Including environment variables.
require('dotenv').config();

const User = require("./models/user");

const admin = {};

admin.username = process.env.ADMINUSER;
admin.fullname = process.env.ADMINNAME;
admin.isAdmin = true;

function seedDB() {
	User.find({ isAdmin: true }, function (err, users) {
		if (users.length === 0) {
			User.register(admin, process.env.ADMINPASSWORD, function (err, admin) {
				if (!err) {
					console.log("Admin Created!");
				}
			});
		}
	});
}

module.exports = seedDB;