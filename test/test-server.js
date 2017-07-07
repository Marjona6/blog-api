'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');

var _require = require('../server'),
    app = _require.app;
//runServer = _require.runServer,
//closeServer = _require.closeServer;

var should = chai.should();

chai.use(chaiHttp);

describe('Blog Posts', function () {

    // run the server before running tests
    before(function () {
        //  return runServer();
    });

    // GET test
    // 1. make request to '/blog-posts'
    // 2. inspect response object; does it have the right status code and right keys?
    it('should list items on GET', function () {
        return chai.request(app).get('/blog-posts').then(function (res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');

            // check that there are objects in the response
            res.body.length.should.be.at.least(1);

            // check that each item has the right key/value pairs
            var expectedKeys = ['id', 'title', 'content'];
            res.body.forEach(function (item) {
                item.should.be.a('object');
                item.should.include.keys(expectedKeys);
            });
        });
    });

    // POST test
    // 1. make a post request by sending data for a new item
    // 2. inspect response object; does it have the right status code and an id?
    it('should add an item on POST', function () {
        var newItem = {
            title: 'Test Post',
            content: 'This is a test blog post. Look at me!'
        };
        return chai.request(app).post('/blog-posts').send(newItem).then(function (res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            //            res.body.should.include.keys('id', 'title', 'content');
            res.body.id.should.not.be.null;
            //  res.body.should.deep.equal(Object.assign(newItem, {
            //      id: res.body.id
        });
    });
});

// PUT test
// 1. make a GET request so we'll have an item to update
// 2. add the id to updateData
// 3. make a PUT request with updateData
// 4. inspect response object; does it have the right status code and the right data?
it('should update items on PUT', function () {
    var updateData = {
        title: 'Another Test Post',
        content: 'Here is some more stuff you need to know.'
    };

    return chai.request(app).get('/blog-posts').then(function (res) {
        // set the id parameter of updateData to the id from the body of the response from the GET call
        updateData.id = res.body[0].id;
        return chai.request(app).put('/blog-posts/' + updateData.id).send(updateData);
    }).then(function (res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.deep.equal(updateData);
    });
});

// DELETE test
// 1. make a GET request so we can get an id for an item to delete
// 2. make a DELETE request; check that status code is 200
it('should delete items on DELETE', function () {
    return chai.request(app).get('/blog-posts').then(function (res) {
        return chai.request(app).delete('/blog-posts/' + res.body[0].id);
    }).then(function (res) {
        res.should.have.status(200);
    });
});

// close the server after running tests
after(function () {
    // return closeServer();
});
