var express = require('express');
const fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/getOneData', function (req, res, next) {
    console.log('LLLLLLLLLLL')
    res.send('got the requ')
  });



module.exports = router;
