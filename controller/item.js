var express = require('express');
var router = express.Router();
var db = require('../models/db');

router.get('/locate', function(req, res) {
    res.render('itemLocate.ejs', { action: '/item/locate' });
});

router.post('/locate', function(req, res) {
    db.itemSearch(req.body.Key, function(err, result) {
	if (err) throw err;
	if(result.length > 0) {
	    res.render('displayItem.ejs', {rs: result});
	}
	else
	    res.send('No items found matching that name.');
    });
});

router.get('/', function(req, res) {
    var ID = req.query.itemID;
    db.itemView(ID,
		function(err, result) {
		    if (err) throw err;
		    
		    if(typeof result != 'undefined' && result.length > 0) {
			res.render('displayItemLocation.ejs', {rs: result});
		    }
		    else {
			res.send('This item is not currently in stock. Check back soon.');
		    }
		}
	       );
});

module.exports = router;
