const db			= require("../models");

exports.createEssay	= function(req, res) {
	db.Essay.create(req.body.essay)
	.then(function(createdEssay){
		res.status(200).send({id: createdEssay._id});
	})
	.catch(function(err) {
		console.log(err);
		res.status(500).send(err);
	});
};

exports.getEssay	= function (req, res) {
	db.Essay.findById(req.params.essay_id)
	.then(function(essay) {
		console.log(req.params.essay_id);
		res.json(essay);
	})
	.catch(function(err) {
		res.status(500).send(err);
	});
};

exports.putEssay	= function(req, res) {
	db.Essay.findByIdAndUpdate(req.body.essay_id, req.body.essay)
	.then(function(essay) {
		res.status(200).send;
	})
	.catch(function(err) {
		console.log(err);
		res.status(500).send(err);
	});
};

exports.deleteEssay	= function(req, res) {
	db.Essay.findByIdAndRemove(req.params.essay_id)
	.then(function() {
		res.status(200).send;
	})
	.catch(function(err) {
		res.status(500).send(err);
	});
};