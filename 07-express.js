var express = require('express');
var request = require('request')

var app = express();

app.all('/books*', function(req, res) {
	request('http://api.usergrid.com/tim/sandbox'+req.url, function(err, result, usergridBody) {
		res.send(usergridBody);
	});
});

app.listen(3000);