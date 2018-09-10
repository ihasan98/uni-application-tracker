const db			= require("../models");

exports.getsUnis   = function(req, res) {
    db.Unis.find({})
    .then(function(unis) {
		res.json(unis);
	})
	.catch(function(err) {
		res.status(500).send(err);
	});
};

exports.createUni  = function(req, res) {
    db.Unis.create(req.body.uni)
    .then(function(createdUni){
        res.status(200).send({id: createdUni._id});
    })
    .catch(function(err) {
        console.log(err);
		res.status(500).send(err);
    });
};

exports.getUni     = function (req, res) {
    db.Unis.findById(req.params.uni_id)
    .then(function(uni) {
        res.json(uni);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

exports.putUni      = function(req, res) {
    db.Unis.findByIdAndUpdate(req.body.uni_id, req.body.uni)
    .then(function(uni) {
        res.status(200).send;
    })
    .catch(function(err) {
        console.log(err);
		res.status(500).send(err);
    });
};

exports.deleteUni      = function(req, res) {
    db.Unis.findByIdAndRemove(req.params.uni_id)
    .then(function() {
        res.status(200).send;
    })
    .catch(function(err) {
		res.status(500).send(err);
    });
};