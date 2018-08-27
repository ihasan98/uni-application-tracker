// Importing the required packages
const	express = require("express"),
		router = express.Router(),
		middleware = require("../middleware"),
		uniDb = require("../models/unis");

// /unis route (returns all unis)
router.get("/", middleware.isLoggedInRoute, function (req, res) {
	uniDb.find({}, function (err, unis) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(unis);
		}
	});
});

router.post("/", middleware.isAdminRoute, function (req, res) {
	uniDb.register(req.body.unis, function (err, createdUni) {
		if (err) {
			console.log(err);
			res.status(500).send; // Send INTERNAL SERVER ERROR
		} else {
			res.status(200).send; // Send SUCCESS
		}
	});
});

// /unis/:uni_id route (returns a specific uni's details)
router.get("/:uni_id", middleware.isLoggedInRoute, function (req, res) {
	uniDb.findById(req.params.uni_id, function (err, uni) {
		if (err) {
			res.send(err);
		}
		else {
			res.json(uni);
		}
	});
});

//Used for adding a university
router.post("/", middleware.hasAccessRoute, function (req, res) {
	uniDb.essays.push(req.body.essay);
	uniDb.save(function (err, uni) {
		if (err) {
			res.status(500).send; // Send INTERNAL SERVER ERROR
		}
		else {
			res.status(200).send; // Send SUCCESS
		}
	});
});

//Used for editing a university's name
router.put("/:uni_id", middleware.isAdminRoute, function (req, res) {
	uniDb.findByIdAndUpdate(req.body.uni_id, req.body.uni, function (err, uni) {
		if (err) {
			console.log(err);
			res.status(500).send; // Send INTERNAL SERVER ERROR
		} else {
			res.status(200).send; // Send SUCCESS
		}
	});
});

router.delete("/:uni_id", middleware.isAdminRoute, function (req, res) {
	uniDb.findByIdAndRemove(req.params.uni_id, function (err) {
		if (err) {
			console.log("Error in deleting university " + err);
			res.status(500).send; // Send INTERNAL SERVER ERROR
		} else {
			res.status(200).send; // Send SUCCESS
		}
	});
});

module.exports = router;