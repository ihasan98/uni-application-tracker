const mongoose      = require("mongoose");

const essaySchema   = new mongoose.Schema({
    uni: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University"
    },

    prompt: String,

    wordLimit: Number,

    lastModified: {
        type: Date,
		default: Date.now()
    },
    
    content: String
});

module.exports = mongoose.model("Essay", essaySchema);