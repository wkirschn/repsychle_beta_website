var express = require('express');
const authUtils = require("../utils/auth");
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;


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

        res.render('account', {...results});

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

router.post('/', (req,res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/login');
    }

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




module.exports = router;
