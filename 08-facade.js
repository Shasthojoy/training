var express = require('express');
var request = require('request')

var app = express();

app.all('/books*', function(req, res) {
	request('http://api.usergrid.com/tim/sandbox'+req.url, function(err, result, usergridBody) {
		try {
      usergridObject = JSON.parse(usergridBody)
      isbn = usergridObject.entities[0].isbn;
        	
      request('https://www.googleapis.com/books/v1/volumes?country=us&q=isbn:'+isbn, function(err, result, isbnBody) {
        usergridObject.entities[0]['description'] = JSON.parse(isbnBody).items[0].volumeInfo.description;
        res.send(usergridObject);
	   	});
    } catch(error) {
		  res.send(usergridBody);
    }
	});
});

app.listen(3000);