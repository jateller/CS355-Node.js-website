var express = require('express');
var router = express.Router();
var db = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.GetAllEmp(function (err, result) {
	if (err) throw err;
	res.render('displayUserTable.ejs', {rs: result});
    });
});


/* Create an employee form */
router.get('/create', function (req, res) {
    res.render('createEmployee2.ejs');
});

router.get('/chPass', function (req, res) {
    res.render('changePass.ejs', {action: '/employee/chPass'});
});

//Create drop down for employee form
router.post('/select', function (req, res) {
    db.GetAllPos(function (err, result) {
	var DropDown = '<select id="position-list" >';
	for (var i=0; result.length > i; i++) {
	    var option = '<option value="' + result[i].posID + '">'
	    + result[i].posTitle + '</option>';
	    DropDown += option;
	}

	res.send(DropDown);
    });
});

router.get('/login', function (req, res) {
    res.render('empLogin.ejs', {action: '/employee/authenticate'});
});

router.post('/chPass', function (req, res) {
    db.chPass(req.body, function (err, result) {
	if ( result.changedRows > 0) {
	    res.render('chPassConfirmation.ejs');
	}
	else
	    res.send('Wrong information. Please try again.');
    });
});

router.post('/authenticate', function (req, res) {
//authenticate user then forward to the control panel
    db.Authenticate(req.body, function(err, result) {
	if (result.length > 0) {
	    res.render('empControl.ejs', {rs: result});
	    }
	else {
	    var str = "Not authenticated. Please try again.";
	    res.send(str);
	}
    });
});


//Save employee to Database
router.post('/create', function (req, res) {
    if (typeof req.body != 'undefined') {
	db.empInsert( req.body, function(err, result) {
	    if(typeof result != 'undefined') {
		var responseHTML = 'Data has been submitted.<br><br>';
		responseHTML += '<a href="/employee/login">Employee Login </a>';
		res.send(responseHTML);
	    }
	    else {
		res.send('An error occurred. User was not inserted');
	    }
	});
    }
});
	    
/* View a single user's information */
// employee control panel

router.get('/', function (req, res) {
    var ID = req.query.empID;
    db.GetOne(ID, 
        function (err, result) {
	    if (err) throw err;

            if(typeof result != 'undefined' && result.length > 0) {
                res.render('displaySingleUserTable.ejs', {rs: result});
            }
            else {
                res.send('No users exist.');
            }
        }
    );
});


module.exports = router;
