console.log("Index.js works!");
const express = require('express');
const passport = require("passport");
const authUtils = require("../utils/auth");

const path = require("path");
const Object = require("../models/object.js");

const router = express.Router();
console.log("Index.js works!");





router.use(express.urlencoded({extended: false}))

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
/*    const users = req.app.locals.users;

    users.find().limit(3).toArray((err, recent) => {
        res.render('index');
    });*/



});


/* INPUTTING REQUIRED ROUTES - NON TESTING */


/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about');
});

/* GET 301 Error page. */
router.get('/301', function(req, res, next) {
    res.render('301');
});

/* GET 401 Error page. */
router.get('/401', function(req, res, next) {
    res.render('401');
});

/* GET 404 Error page. */
router.get('/404', function(req, res, next) {
    res.render('404');
});

/* GET 500 Error page. */
router.get('/500', function(req, res, next) {
    res.render('500');
});


/* GET 502 Error page. */
router.get('/502', function(req, res, next) {
    res.render('502');
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
    res.render('contact');
});


/* GET Frequently Asked Questions page. */
router.get('/faq', function(req, res, next) {
    res.render('faq');
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

/* GET Register page. */
router.get('/register', (req, res, next) => {
/*    const messages = req.flash();
    res.render('register', {messages})*/
    res.render('register');
});











/*


router.get('/login', (req, res, next) => {
    const messages = req.flash();
    res.render('login', messages)
});


router.post('/login', passport.authenticate('local',
    {failureRedirect: '/auth/login', failureFlash: 'Wrong username or password'}), (req, res, next) => {
    res.redirect('/users');
});
*/




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
});


/* GET add-object page. */
router.get('/add-object', function(req, res, next) {
    res.render('add-object', {title: 'RePsychle'}

    );

});

/* GET realm test page. */
router.get('/realm', function(req, res, next) {
    res.render('realm', {title: 'RePsychle'}

    );

});


router.post('/login', passport.authenticate('local',
    {failureRedirect: '/auth/login', failureFlash: 'Wrong username or password'}), (req, res, next) => {
    res.redirect('/users');
});



/* POST add-object page. */
router.post('/add-object', function(req, res, next) {

    const object = new Object({

        objectName: document.body.objectName,
        objectDescription: document.body.objectDescription,
        objectCategory:  document.body.objectCategory,
        disposalMethod:  document.body.disposalMethod,
        disposalRegionLatitude:  document.body.objectLat,
        disposalRegionLongitude:  document.body.objectLong,
        ecoScore:  document.body.ecoScore
    });
    object.save().then((result) => {
        res.send(result)
    })
        .catch((err) => {
            console.log(err)
        })

res.render('index')
});

router.get('/add-object-action', (req,res) => {


    const object = new Object({

        objectName: 'Tempest',
        objectDescription: 'It is in a teapot!',
        objectCategory: 'ceramic',
        disposalMethod: 'garbage',
        disposalRegionLatitude: '100.200',
        disposalRegionLongitude: '-90.211',
        ecoScore: 'LOW'
    });
   object.save()

    object.save().then((result) => {
        res.send(result)
        res.render(result)
    })
        .catch((err) => {
            console.log(err)
        })

})



module.exports = router;

