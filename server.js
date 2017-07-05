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

app.listen(process.env.PORT || 8080, function () {
    // port displays as "undefined" when console.logged
    console.log('Your app is listening on port ' + process.env.PORT || 8080);
});

// add a couple of blog posts on server load so you'll have data to look at when server starts

// GET requests to /blog-posts

// POST requests to /blog-posts

// DELETE requests to /blog-posts/:id

// PUT requests to /blog-posts/:id

// use Express router and modularize routes to /blog-posts
