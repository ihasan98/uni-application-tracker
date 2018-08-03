var mongoose = require("mongoose");

var essaySchema = new mongoose.Schema({
	name: String
});

var uniSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "You have to enter a name."]
	},

	essays: [ essaySchema ]
});

// Defines a virtual property for the number of essays
uniSchema.virtual('essays_num').get(function () {
	return this.essays.length;
});

module.exports = mongoose.model("University", uniSchema);