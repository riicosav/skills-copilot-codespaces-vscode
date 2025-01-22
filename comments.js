// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var comments = [];

var server = http.createServer(function(req, res) {
    var parseUrl = url.parse(req.url, true);
    var pathname = parseUrl.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            if (err) {
                res.statusCode = 404;
                res.end('Not found');
            } else {
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(data);
            }
        });
    } else if (pathname === '/comment') {
        var query = parseUrl.query;
        if (query) {
            comments.push(query);
        }
        res.end(JSON.stringify(comments));
    } else if (pathname === '/favicon.ico') {
        res.end('');
    } else {
        fs.readFile('.' + pathname, function(err, data) {
            if (err) {
                res.statusCode = 404;
                res.end('Not found');
            } else {
                res.end(data);
            }
        });
    }
});

server.listen(3000, function() {
    console.log('Server is running');
});