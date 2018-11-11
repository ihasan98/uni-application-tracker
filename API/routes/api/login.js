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
                            const token = jwt.sign(JSON.stringify(user), process.env.SECRETKEY);
                            
                            // We don't need the salt and hash to be returned to the user
                            delete user.salt;
                            Reflect.deleteProperty(user, 'hash');
                            console.log("Token "+ user);
                            res.json({
                                auth: token,
                                user: user
                            });
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