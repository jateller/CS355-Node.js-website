var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res) {
    res.render('about.ejs')
});

router.get('/contact', function(req, res) {
    res.render('contact.ejs')
});

router.get('/displayUser', function(req, res) {
    res.render('getUser.ejs', { action: '/displayUser'});
});

router.post('/displayUser', function(req, res) {
    res.render('displayUser.ejs', req.body );
});

module.exports = router;
