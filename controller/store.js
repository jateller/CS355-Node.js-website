var express = require('express');
var router = express.Router();
var db = require('../models/db.js');

router.get('/locate', function(req, res) {
    res.render('storeLocate.ejs', { action: '/store/locate' });
});

router.post('/locate', function(req, res) {
    db.storeSearch(req.body.Zip, function(err, result) {
	if (err) throw err;
	if (result.length > 0) {
	    res.render('displayStore.ejs', {rs: result});
	    }
	else
	    res.send('Sorry! No stores located in that zip code.');
    });
});

router.get('/', function(req, res) {
    var ID = req.query.storeID;
    db.storeView(ID,
		 function(err, result) {
		     if(err) throw err;

		     if(typeof result != 'undefined' && result.length > 0) {
			 res.render('displayStoreInventory.ejs', {rs: result});
		     }
		     else {
			 res.send('This store has no inventory. Sorry!');
		     }
		 }
		);
});

module.exports = router;
