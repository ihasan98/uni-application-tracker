const db			= require("../models");

exports.getsUsers   = function(req, res) {
    db.User.find({})
    .then(function(users) {
		res.json(users);
	})
	.catch(function(err) {
		res.status(500).send(err);
	});
};

exports.createUser  = function(req, res) {
    const {username, contact, email, fullname, password} = req.body;
    db.User.register({username, contact, email, fullname}, password)
    .then(function(createdUser){
        res.status(200).json(createdUser);
    })
    .catch(function(err) {
        console.log(err);
		res.status(500).send(err);
    });
};

exports.getUser     = function (req, res) {
    db.User.findById(req.params.user_id)
    .then(function(user) {
        res.json(user);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
}

exports.putUser      = function(req, res) {
    db.User.findByIdAndUpdate(req.body.user_id, req.body.user)
    .then(function(user) {
        res.status(200).json(user);
    })
    .catch(function(err) {
        console.log(err);
		res.status(500).send(err);
    });
}

exports.deleteUser      = function(req, res) {
    db.User.findByIdAndRemove(req.params.user_id)
    .then(function() {
        res.status(200).json({"message" : "we deleted it!"});
    })
    .catch(function(err) {
		res.status(500).send(err);
    });
}