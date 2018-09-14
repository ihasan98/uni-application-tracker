const mongoose 				= require("mongoose"),
	  passportLocalMongoose = require("passport-local-mongoose");
	  
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "You have to enter a email."]
	},

	fullname: {
		type: String,
		required: [true, "You have to enter a name."]
	},

	contact: {
		type: String,
		required: [true, "You have to enter contact information."]
	},

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