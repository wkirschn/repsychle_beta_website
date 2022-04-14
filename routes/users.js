var express = require('express');
const authUtils = require("../utils/auth");
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const multer = require('multer')
const {request} = require("express");

//Define Storage for Images

const storage = multer.diskStorage( {
    destination: function(req, res, callback) {
        callback(null, './public/images')
    },

    // add back the extension
    filename: function (req, res, callback) {
        callback(null, Date.now() + file.originalName);
    },

});

// Upload paramaters for multer

const upload = multer({
    storage:storage,
    limits: {
        fieldSize:1024*1024*5,
    },
})




/* GET users listing. */
router.get('/', (req, res, next) =>
{
    if (!req.isAuthenticated()) {
        res.redirect('auth/login');
    }

    const users = req.app.locals.users;
    const _id = ObjectID(req.session.passport.user);


    users.findOne({_id}, (err, results) => {
        if (err) {
            throw err;
        }



        res.render('account', {...results} );

    });

});

router.get('/profile', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('../auth/login');
    }

    const users = req.app.locals.users;
    const _id = ObjectID(req.session.passport.user);

    users.findOne({_id}, (err, results) => {
        if (err || !results) {
            res.render('public-profile', {messages: {err: ['User not found']}})
        }

        res.render('public-profile', {...results});

    });

});

router.post('/', upload.single('image'), (req,res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/login');
    }


    //Define Storage for Images

    const storage = multer.diskStorage( {
        destination: function(req, res, callback) {
            callback(null, './public/images')
        },

        // add back the extension
        filename: function (req, res, callback) {
            callback(null, Date.now() + file.originalName);
        },

    });


    const users = req.app.locals.users;
    const {username, firstName, lastName} = req.body;
    const _id = ObjectID(req.session.passport.user);
    const password = authUtils.hashPassword(req.body.password)

    users.updateOne({_id}, { $set: {username, firstName, lastName, password}}, (err) => {;
    if (err) {
        throw err;
    }

    res.redirect('/users');


})});

router.post('/upload/', function(req,res) {
    console.log("BEGIN")
})



module.exports = router;
