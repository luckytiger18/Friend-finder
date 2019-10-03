var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var port = process.env.PORT || 3000;

//making static assets
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.JAWSDB_URL) {
	connection = mysql.cÍreateConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'friend_finder_db'
	});
};


connection.connect();


// * A GET route with the url `/api/friends`. This will be used to display all friends from the friends table in json
app.get('/api/friends', function (req, res) {
	if (req.query.id == undefined) {
		connection.query('SELECT * FROM friends', function (error, results, fields) {
			if (error) res.send(error)
			else res.json(results);
		});
	} else {
		connection.query('SELECT question_id, friend_id, t2friend_id, answer_difference FROM\
	(SELECT *, (answer-t2answer) AS answer_difference FROM \
	(SELECT *\
	FROM scores s1\
	LEFT JOIN (SELECT question_id AS t2question_id,\
		friend_id AS t2friend_id, answer AS t2answer\
		FROM scores s2) t2\
		ON t2question_id = s1.question_id) t3) t4 WHERE friend_id = ? AND t2friend_id != ?;', [req.query.id, req.query.id], function (error, results, fields) {
				if (error) res.send(error)
				else {
					var friendCalc = {}
					for (var i = 0; i < results.length; i++) {
						var row = results[i];
						if (!(row.t2friend_id in friendCalc)) {
							friendCalc[row.t2friend_id] = Math.abs(row.answer_difference);
						} else {
							friendCalc[row.t2friend_id] = friendCalc[row.t2friend_id] + Math.abs(row.answer_difference)
						}
					}
					var items = Object.keys(friendCalc).map(function (key) {
						return [key, friendCalc[key]];
					});
					items.sort(function (first, second) {
						return first[1] - second[1];
					});
					var bestFriendId = items.slice(0, 1)[0][0];
					connection.query('select name, picture_link FROM friends WHERE id = ?', [bestFriendId], function (error, results, fields) {
						if (error) res.send(error)
						else {
							res.json(results);
						}
					})

				}
			})
	}
});

app.post('/api/insert', function (req, res) {
	connection.query('INSERT into friends (name, picture_link) VALUES (?, ?)', [req.body.first_name1, req.body.picture1], function (error, results, fields) {
		if (error) res.send(error)
		else {
			//results.insertId
			var jsonBody = JSON.parse(req.body.answer);
			for (var i = 0; i < 10; i++) {
				connection.query('INSERT into scores (question_id, friend_id, answer) VALUES (?, ?, ?)', [i + 1, results.insertId, jsonBody[i]], function (error, results, fields) {
					if (error) { console.log(error) }
				});
			}
			res.send('/friend.html?id=' + results.insertId)
		}
	});
});

app.listen(port, function () {
	console.log('listening on 3000');
});
