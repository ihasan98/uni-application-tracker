var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "You have to enter a username/userid."]
	},

	password: {
		type: String,
		required: [true, "You have to enter a password."]
	},

	email: {
		type: String,
		required: [true, "You have to enter a valid email."]
	},

	fullname: {
		type: String,
		required: [true, "You have to enter your full name."]
	},

	contact: String,

	isAdmin: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("User", userSchema);