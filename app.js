// Including environment variables.
require('dotenv').config();

// Requiring the packages
var	express 		= require("express"),
	app				= express(),
	bodyparser		= require("body-parser"),
	mongoose		= require("mongoose"),
	flash			= require("connect-flash"),
	methodOverride	= require("method-override");

// Linking the Mongoose models.
var User 			= require("./models/user");

// Linking the routes
var indexRoutes 	= require("./routes/index"),
	userRoutes		= require("./routes/users");

// Configuring the app and the Mongo Database
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Setting up sessions.
app.use(require("express-session")({
	secret: process.env.SECRETKEY,
	resave: false,
	saveUninitialized: false
}));

app.use(function(req, res, next){
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Configuring the routes.
app.use("/", indexRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Server has started at PORT:" + process.env.PORT);
});