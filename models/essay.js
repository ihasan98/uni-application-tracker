const mongoose 		= require("mongoose");

const essaySchema 	= new mongoose.Schema({
	prompt: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	content: String
});

module.exports	= mongoose.model("Essay", essaySchema);