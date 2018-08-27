const mongoose 		= require("mongoose");

const essaySchema = new mongoose.Schema({
	prompt: String,
	description: String,
	wordLimit: String
});

const uniSchema 	= new mongoose.Schema({
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

module.exports	= mongoose.model("University", uniSchema);