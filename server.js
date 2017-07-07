'use strict';

// all the required stuff up here
var express = require('express');
var morgan = require('morgan');

var app = express();

var blogPostsRouter = require('./blogPostsRouter');

// log the HTTP layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// route requests to the blogPostsRouter
app.use('/blog-posts', blogPostsRouter);

app.listen(8080, function () {
    // port displays as "undefined" when console.logged
    console.log('Your app is listening on port ' + 8080);
});

var server;

// define the runServer and closeServer functions
//function runServer() {
//    var port = 8080;
//    return new Promise(function (resolve, reject) {
//        server = app.listen(port, function () {
//            console.log('Your app is listening on port ' + 8080);
//            resolve(server);
//        }).on('error', function (err) {
//            reject(err);
//        });
//    });
//}
//
//function closeServer() {
//    return new Promise(function (resolve, reject) {
//        console.log('Closing server');
//        server.close(function (err) {
//            if (err) {
//                reject(err);
//                // so we don't also call `resolve()`
//                return;
//            }
//            resolve();
//        });
//    });
//}
//
//if (require.main === module) {
//    runServer().catch(function (err) {
//        return console.error(err);
//    });
//};

module.exports = {
    app: app
    //    runServer: runServer,
    //    closeServer: closeServer
};
