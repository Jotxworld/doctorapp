var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
//res.render('biodata', { title: 'DoctorApp' });
  res.redirect('/doctor');
    

});

module.exports = router;
