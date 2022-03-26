
console.log("Index.js works!");
const express = require('express');
const router = express.Router();
console.log("Index.js works!");
//


// Encodes the Forms

router.use(express.urlencoded({extended: false}))


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'RePsychle'}

      );



});


/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login', {title: 'RePsychle'}

    );

});

/*POST register page. */

router.post('/login', (req, res) => {

});


/* GET register page. */
router.get('/register', function(req, res, next) {
    res.render('register', {title: 'RePsychle'}

    );

});

/*POST register page. */

router.post('/register', (req, res) => {

    req.body.firs


});






module.exports = router;

