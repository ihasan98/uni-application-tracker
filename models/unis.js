var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "You have to enter a name."]
	},

	essays: [
		{
			name: String
		}
	],
});

// Defines a virtual property for the number of essays
schema.virtual('essays_num').get(function () {
	return this.essays.length;
});

module.exports = mongoose.model("Universities", schema);