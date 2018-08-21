const mongoose 				= require("mongoose"),
	  passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	email: String,

	fullname: String,

	contact: String,

	unis: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "University" 
		}
	],

	isAdmin: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);