// Including environment variables.
require('dotenv').config();

const   passport        = require("passport"),
        jwt             = require("jsonwebtoken"),
        router          = require("express").Router();

// Route for the landing page.
router.post("/", 
    function (req, res, next) {
        passport.authenticate("local", function(err, user, info) {
            if (err) {
                res.status(500).json(err);
            }
            else if (user) {
                    req.login(user, function(err) {
                        if (err){
                            console.log(err);
                            res.json(err);
                        } 
                        else {
                            console.log("Token "+ user);
                            const token = jwt.sign(JSON.stringify(user), process.env.SECRETKEY);
                            res.json({auth: token});
                        }
                    });
                }
                else{
                    res.status(200).json({error: "User not found!"});
                }
        })(req, res, next);
    }
);

module.exports = router;