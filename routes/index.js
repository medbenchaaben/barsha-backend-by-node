var express = require('express');
var router = express.Router();
var user = require('./user');
router.get("/", function(req, res) {
    console.log("here");
 
 });
router.use('/user', user);
module.exports = router;