// Including environment variables.
require('dotenv').config();

const User = require("./models/user");

const admin = {
	username: process.env.ADMINUSER,
	fullname: process.env.ADMINNAME,
	contact: "1111111111",
	email: "admin@example.com",
	isAdmin: true
};


module.exports = function() {
	User.find({ isAdmin: true }, function (err, users) {
		if (users.length === 0) {
			User.register(admin, process.env.ADMINPASSWORD, function (err, admin) {
				if (err) {
					console.log(err);
				} else {
					console.log("Admin Created!");
				}
			});
		}
	});
};