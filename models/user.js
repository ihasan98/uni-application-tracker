const mongoose 				= require("mongoose"),
	  passportLocalMongoose = require("passport-local-mongoose");

const userUniSchema = new mongoose.Schema({
	uni: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "University"
	},
	essays: [
		{
			essay: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "University.essays"
			},
			date: {
				type: Date,
				default: Date.now()
			},
			essayContents: String
		}
	]
});

const userSchema = new mongoose.Schema({
	email: String,

	fullname: String,

	contact: String,

	essays: [ userUniSchema ],

	isAdmin: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);