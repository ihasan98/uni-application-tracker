// Including environment variables.
require('dotenv').config();

// Requiring the packages
const	express 		= require("express"),
		app				= express(),
		path			= require("path"),
		bodyparser		= require("body-parser"),
		mongoose		= require("mongoose"),
		flash			= require("connect-flash"),
		passport		= require("passport"),
		jwtStrategy		= require("./loginStrategy"),
		LocalStrategy	= require("passport-local"),
		methodOverride	= require("method-override"),
		seedDB			= require("./seeds");

seedDB();

// Linking the Mongoose models.
const 	User 			= require("./models/user");

// Linking the routes
const 	indexRoutes 	= require("./routes/index"),
		userRoutes		= require("./routes/users"),
		uniRoutes		= require("./routes/unis"),
		essayRoutes		= require("./routes/essays");

// Linking the API
const	api 		= require("./routes/api/index");

// Setting up styling files.
app.use(express.static(path.join(__dirname, "public")));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))); // Redirect bootstrap JS
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist'))); // Redirect JS jQuery
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))); // Redirect CSS bootstrap

// Configuring the app and the Mongo Database
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// Setting up sessions and passport..
app.use(require("express-session")({
	secret: process.env.SECRETKEY,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // Allows for persistent sessions

//We use the local strategy to generate the JWT, then use JWT strategy to authenticate all other requests.
passport.use(new LocalStrategy(User.authenticate()));
passport.use(jwtStrategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser	= req.user;
	res.locals.error 		= req.flash("error");
	res.locals.success 		= req.flash("success");
	next();
});

// Configuring the routes.
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/users/:user_id/unis", uniRoutes);
app.use("/users/:user_id/unis/:uni_id/essays", essayRoutes);

// Configuring the API
app.use("/api", api);

app.listen(process.env.PORT, process.env.IP, function() {
	console.log("Server has started at PORT:" + process.env.PORT);
});