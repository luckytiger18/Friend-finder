var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')

//making static assets
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'schema_db'
});

connection.connect();
// * A GET route with the url `/api/friends`. This will be used to display all friends from the friends table in json
app.get('/api/friends', function (req, res) {
	connection.query('SELECT * FROM friends', function (error, results, fields) {
		if (error) res.send(error)
		else res.json(results);
	});
});

app.post('/api/insert', function (req, res) {
	console.log(req.body.first_name1)
	console.log(req.body.picture1)
	console.log(req.body.answer)
	// connection.query('INSERT into friends (name, picture_link) VALUES (?,?)', [req.query.name, req.query.picture_link], function (error, results, fields) {
	// 	if (error) res.send(error)
	// 	else res.redirect('/');
	// });
});

	// in the server.js from the previous activity, make a route called /insert/:name

	// 	get req.params.name and do a mysql query inserting req.params.name

	// 		after the insert, redirect the user to the root route using res.redirect

	// bonus: add an if statement to make sure the name param is greater than 1 character
	// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

	// app.post('/api/friends', function(req, res){
	// 	if (req.params.name.length > 1){
	// 		connection.query('INSERT INTO people (name) VALUES (?)', [req.params.name], function (error, results, fields) {
	// 		  if (error) res.send(error)
	// 		  else res.redirect('/');
	// 		});
	// 	}else{
	// 		res.send('invalid name')
	// 	}
	// });

	// by default the forms use req.query so let's not fight it
	// app.get('/insert-form', function(req, res){
	// 	// res.json(req.query);

	// 	if (req.query.name.length > 1){
	// 		connection.query('INSERT INTO people (name) VALUES (?)', [req.query.name], function (error, results, fields) {
	// 		  if (error) res.send(error)
	// 		  else res.redirect('/');
	// 		});
	// 	}else{
	// 		res.send('invalid name')
	// 	}
	// });


	app.listen(3000, function () {
		console.log('listening on 3000');
	});
