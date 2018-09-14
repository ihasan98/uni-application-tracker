// Including environment variables.
require('dotenv').config();

const mongoose	= require("mongoose");

mongoose.set("debug", true);
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
mongoose.Promise = Promise;

module.exports.User     = require("./user");
module.exports.Unis     = require("./unis");
module.exports.Essay    = require("./essay");