var http = require('http');
var path = require('path');
var fs = require('fs');
var hostname = 'localhost';
var port = 5000;

var server = http.createServer(function(req, res) {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/home.html') {
            var filePath = path.join(__dirname, 'home.html');
            sendHtmlFile(res, filePath);
        } else if (req.url === '/about') {
            var filePath = path.join(__dirname, 'about.html');
            sendHtmlFile(res, filePath);
        } else if (req.url === '/contact') {
            var filePath = path.join(__dirname, 'contact.html');
            sendHtmlFile(res, filePath);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Invalid Request!');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Invalid Request!');
    }
});

function sendHtmlFile(res, filePath) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found!');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
};

server.listen(port, hostname, () => {
    console.log('The NodeJS server on port 5000 is now running….');
});