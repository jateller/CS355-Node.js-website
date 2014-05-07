var mysql = require('mysql');


/* Database Configuration */
var connection = mysql.createConnection({
    host: 'cwolf.cs.sonoma.edu',
    user: 'jteller',
    password: '3067836'
});

var dbToUse = 'jteller';
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function(err){
    if (err) throw err;

    //use the database for any queries run
    var useDatabaseQry = 'USE ' + dbToUse;

    //create the User table if it does not exist
    connection.query(useDatabaseQry, function(err){
	if (err) throw err;

	connection.query('CREATE TABLE IF NOT EXISTS Positions('
			 + 'posID INT AUTO_INCREMENT PRIMARY KEY, '
			 + 'posTitle VARCHAR(50))',
			 function(err) {
			     if (err) throw err;
			 });

	var createTableQry = 'CREATE TABLE IF NOT EXISTS Employee('
	    + 'empID INT AUTO_INCREMENT PRIMARY KEY'
	    + ', Fname VARCHAR(256)'
	    + ', Lname VARCHAR(256)'
	    + ', Email VARCHAR(256)'
	    + ', Password VARCHAR(50)'
	    + ', Position INT'
	    + ', FOREIGN KEY(Position) REFERENCES Positions(posID)'
	    + ')';

	connection.query(createTableQry, function(err){
	    if (err) throw err;
	    });

	connection.query('CREATE TABLE IF NOT EXISTS Items('
			 + 'itemID INT AUTO_INCREMENT PRIMARY KEY, '
			 + 'Name VARCHAR(50), '
			 + 'Brand VARCHAR(50), '
			 + 'Price INT)',
			 function(err) {
			     if (err) throw err;
			 });

	connection.query('CREATE TABLE IF NOT EXISTS Stores('
			 + 'storeID INT AUTO_INCREMENT PRIMARY KEY, '
			 + 'Address VARCHAR(100), '
			 + 'City VARCHAR(100), '
			 + 'Zip VARCHAR (5))',
			 function(err) {
			     if (err) throw err;
			 });

	connection.query('CREATE TABLE IF NOT EXISTS Inventory('
			 + 'itemID INT, '
			 + 'storeID INT, '
			 + 'inStock INT, '
			 + 'Dept VARCHAR (50), '
			 + 'PRIMARY KEY (itemID, storeID), '
			 + 'FOREIGN KEY (itemID) REFERENCES Items(itemID), '
			 + 'FOREIGN KEY (storeID) REFERENCES Stores(storeID))',
			 function(err) {
			     if (err) throw err;
			 });

    });
});

exports.GetAllPos = function(callback) {
    connection.query('select * from Positions',
		     function (err, result) {
			 if(err) {
			     console.log(err);
			     callback(true);
			     return;
			 }
			 callback(false, result);
		     }
		    );
}

exports.GetAllEmp = function(callback) {
    connection.query('select empID, Fname, Lname, Email from Employee',
		     function (err, result) {
			 if(err) {
			     console.log(err);
			     callback(true);
			     return;
			 }
			 callback(false, result);
		     }
		    );
}

exports.empInsert = function(Info, callback) {
    var query = 'INSERT INTO Employee VALUES(null, "'
	+ Info.Fname + '", "'
	+ Info.Lname + '", "'
	+ Info.Email + '", "'
	+ Info.Password + '", '
	+ Info.Position + ')'
    connection.query(query,
		     function (err, result) {
			 if(err) {
			     console.log(err)
			     callback(true);
			     return
			 }
			 callback(false, result);
			 }
		    );
}

exports.GetOne = function(Info, callback) {
    connection.query('select * from Employee where empID = ?', Info,
		     function(err, result) {
			 if (err) {
			     console.log(err)
			     callback(true);
			     return
			 }
			 callback(false, result);
			 }
		     );
}

exports.itemSearch = function(Info, callback) {
    var query = 'SELECT * FROM Items WHERE LOWER(Name) LIKE LOWER("%'+Info+'%") OR LOWER(Brand) LIKE LOWER("%'+Info+'%")';
    connection.query(query,
		     function (err, result) {
			 if(err) {
			     console.log(err)
			     callback(true);
			     return
			 }
			 callback(false, result);
			 }
		     );
}

exports.storeSearch = function(Info, callback) {
    connection.query('SELECT * FROM Stores WHERE Zip = ?', Info,
		     function(err, result) {
			 if(err) {
			     console.log(err)
			     callback(true);
			     return
			     }
			 callback(false, result);
			 }
		     );
    }

exports.Authenticate = function(Info, callback) {
    var query = 'SELECT e.empID, e.Fname, e.Lname, e.Email, e.Password, p.posTitle FROM Employee e join Positions p on e.Position=p.posID WHERE Email = "' + Info.Email + '" AND Password = "' + Info.Password + '"';
    connection.query(query,
		     function (err, result) {
			 if(err) {
			     console.log(err);
			     callback(true);
			     return
			 }
			 callback(false, result);
			 }
		     );
    }

exports.storeView = function(storeID, callback) {
    var query = 'SELECT * FROM View' + storeID;
    connection.query(query,
		     function(err, result) {
			 if (err) {
			     console.log(err)
			     callback(true);
			     return
			 }
			 callback(false, result);
			 }
		     );
    }

exports.itemView = function(itemID, callback) {
    var query = 'SELECT * FROM itemView' + itemID;
    connection.query(query,
		     function(err, result) {
			 if (err) {
			     console.log(err)
			     callback(true);
			     return
			 }
			 callback(false,result);
			 }
		     );
}

exports.chPass = function(Info, callback) {
    var query = 'UPDATE Employee SET Password = "'
    + Info.newPass + '" WHERE Email = "' 
    + Info.Email + '" AND Password = "'
    + Info.oldPass + '"'
    connection.query(query,
		     function(err, result) {
			 if (err) {
			     console.log(err)
			     callback(true);
			     return
			 }
			 callback(false, result);
			 }
		     );
}
