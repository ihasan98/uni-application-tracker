const mongoose      = require("mongoose");

const essaySchema   = new mongoose.Schema({
    uni: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
        required: [true, "A reference to a university is required!"]
    },

    prompt: {
		type: String,
		required: [true, "You have to enter a prompt."]
	},

    wordLimit: Number,

    lastModified: {
        type: Date,
		default: Date.now()
    },
    
    content: String
});

module.exports = mongoose.model("Essay", essaySchema);