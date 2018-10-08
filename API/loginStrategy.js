const	userDB 		= require("./models/user"),
		extractJwt	= require("passport-jwt").ExtractJwt,
		jwtStrategy	= require("passport-jwt").Strategy;

module.exports = new jwtStrategy({
	jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey   : process.env.SECRETKEY
	}, function (payload, done){
		console.log("jwt found user: " + payload._id);
		userDB.findOne({_id: payload._id})
		.then(function(user) {
			if (user) {
				return done(null, user);
			}
			return done({err: "User not found?"}, false);
		})
		.catch(function(err){
			return done(err, false);
		});
});