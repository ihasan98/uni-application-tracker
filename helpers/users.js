const db			= require("../models");

exports.getsUsers   = function(req, res) {
    db.User.find({})
    .then(function(users) {
		res.json(users);
	})
	.catch(function(err) {
		res.send(err);
	});
}

exports.createUser  = function(req, res) {
    db.User.register(req.body.user, req.body.password)
    .then(function(createdUser){
        res.status(200).send;
    })
    .catch(function(err) {
        console.log(err);
		res.status(500).send;
    });
}

exports.getUser     = function (req, res) {
    db.User.findById(req.params.user_id)
    .then(function(user) {
        res.json(user);
    })
    .catch(function(err) {
        res.send(err);
    });
}

exports.putUser      = function(req, res) {
    db.User.findByIdAndUpdate(req.body.user_id, req.body.user)
    .then(function(user) {
        res.status(200).send;
    })
    .catch(function(err) {
        console.log(err);
		res.status(500).send;
    });
}

exports.deleteUser      = function(req, res) {
    db.User.findByIdAndRemove(req.params.user_id)
    .then(function() {
        res.status(200).send;
    })
    .catch(function(err) {
        console.log("Error in deleting user: " + err);
		res.status(500).send;
    });
}