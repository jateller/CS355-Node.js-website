// Module dependencies
//var ejs = require('ejs');

var express    = require('express'),
    mysql      = require('mysql');
    connect    = require('connect');
    ejs        = require('ejs');

var routes = require('./controller/index');
var employee = require('./controller/employee');
var item = require('./controller/item');
var store = require('./controller/store');

// Application initialization
/*
var connection = mysql.createConnection({
        host     : 'cwolf.cs.sonoma.edu',
        user     : 'jteller',
        password : '3067836'
    });
  */  
//var app = module.exports = express.createServer();
var app = express();

/*
// Database setup
//connection.query('DROP DATABASE IF EXISTS test', function(err) {
//	if (err) throw err;
	connection.query('CREATE DATABASE IF NOT EXISTS jteller', function (err) {
	    if (err) throw err;
	    connection.query('USE jteller', function (err) {
	        if (err) throw err;
        	connection.query('CREATE TABLE IF NOT EXISTS users('
				 + 'id INT NOT NULL AUTO_INCREMENT,'
				 + 'PRIMARY KEY(id),'
        			 + 'email VARCHAR(50),'
				 + 'username VARCHAR(30),'
				 + 'password VARCHAR(30)'
				 +  ')', function (err) {
        			     if (err) throw err;
				 });
	    });
	});
//});
*/
// Configuration

app.use(connect.urlencoded());
app.use(connect.json());

app.set('subtitle', 'Super Ultra Mart');
app.set('view engine', 'ejs'); //configure view engine
app.set('views'. __dirname + '/views'); //configure where the template engine will look for templates

// Main route sends our HTML file
app.use(express.static(__dirname + '/public'));

//res.render('displayUserTable.ejs', {rs: result});



// Begin listening

app.use('/', routes);
app.use('/employee', employee);
app.use('/item', item);
app.use('/store', store);

app.listen(8025);
console.log("Express server listening on port %d in %s mode", app.settings.env);
