const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const localStrategy = require('passport-local');
const FilePond = require('filepond');

router.get('/login', (req, res, next) => {
    const messages = req.flash();
    res.render('login', messages)
});


router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/register', failureFlash: 'Wrong username or password'}), (req, res, next) => {
    res.redirect('/users');
});


router.get('/register', (req, res, next) => {
    const messages = req.flash();
    res.render('register', messages)
});

router.post('/register', (req, res, next) => {
    const registrationParams = req.body;
    const emailAddress = req.app.locals.users;
    const payload = {
        username: registrationParams.username,
        password: authUtils.hashPassword(registrationParams.password)
    };

    emailAddress.insertOne(payload, (err) => {
        if (err) {
            req.flash('error', 'Please use a unique username!')
        } else {
            req.flash('success', 'User account was added successfully!')
        }

        res.redirect('../auth/login');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

