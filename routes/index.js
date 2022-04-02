console.log("Index.js works!");
const express = require('express');
const passport = require("passport");
const authUtils = require("../utils/auth");

const router = express.Router();
console.log("Index.js works!");





router.use(express.urlencoded({extended: false}))

/*
/!* GET home page. *!/
router.get('/', function(req, res, next) {
  res.render('index', {title: 'RePsychle'}

      );



});


router.get('/login', (req, res, next) => {
    const messages = req.flash();
    res.render('login', messages)
});


router.post('/login', passport.authenticate('local',
    {failureRedirect: '/auth/login', failureFlash: 'Wrong username or password'}), (req, res, next) => {
    res.redirect('/users');
});


router.get('/register', (req, res, next) => {
    const messages = req.flash();
    res.render('register', {messages})
});

router.post('/register', (req, res, next) => {
    const registrationParams = req.body;
    const users = req.app.locals.users;
    const payload = {
        username: registrationParams.username,
        password: authUtils.hashPassword(registrationParams.password)
    };

    users.insertOne(payload, (err) => {
        if (err) {
            req.flash('error', 'Please use a unique username!')
        } else {
            req.flash('success', 'User account was added successfully!')

        }

        res.redirect('auth/register');
    });
});

router.get('/logout', (req, res, next) => {
    req.session.destory();
    res.redirect('/');
});*/


/* GET add-object page. */
router.get('/add-object', function(req, res, next) {
    res.render('add-object', {title: 'RePsychle'}

    );

});

/* POST add-object page. */
router.post('/add-object', function(req, res, next) {



res.render('index')
});




module.exports = router;

