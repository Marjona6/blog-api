'use strict';

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var _require = require('./models'),
    BlogPosts = _require.BlogPosts;

// here is some data to look at when server loads

BlogPosts.create('How to Get a Job', 'Network and know people. Tell them you want a job. Have good skills. Get your job.');
BlogPosts.create('How to Negotiate a Salary', 'Know your worth. Have a desired salary range in mind going into negotiations.');

// Create
// (working)
// when new blog post added, ensure has required fields.
// if no, log error, return 400 status code with helpful error message.
// if yes, add new item, return it with 201 status message.
router.post('/', jsonParser, function (req, res) {
    // ensure `title` and `content` are in request body
    var requiredFields = ['title', 'content'];
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (!(field in req.body)) {
            var message = 'Missing ' + field + ' in request body';
            console.error(message);
            return res.status(400).send(message);
        }
    }
    var item = BlogPosts.create(req.body.title, req.body.content);
    res.status(201).json(item);
});

// Retrieve
// (working)
// send JSON representation of all blog posts on GET requests to root
router.get('/', function (req, res) {
    res.json(BlogPosts.get());
});

// Update
// (working)
// PUT request with updated blog post
// ensure required fields are present
// sure that blog post ID in URL path and in updated item match
// if error, log error and return status code 400
// if OK, call BlogPosts.updateItem with updated blog post
router.put('/:id', jsonParser, function (req, res) {
    var requiredFields = ['title', 'content', 'id'];
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (!(field in req.body)) {
            var message = 'Missing ' + field + ' in request body.';
            req.body.id + ' must match';
            console.error(message);
            return res.status(400).send(message);
        }
    }
    console.log('Updating blog post with ID ' + req.params.id);
    var updatedItem = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content
    });
    res.status(204).json(updatedItem);
});

// Delete
// (working)
// Delete blog posts by id
router.delete('/:id', function (req, res) {
    BlogPosts.delete(req.params.id);
    console.log('Deleted blog post with ID ' + req.params.id);
    res.status(200).end();
});

module.exports = router;
