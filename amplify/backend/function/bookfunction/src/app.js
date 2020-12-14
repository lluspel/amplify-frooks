var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
// var cors = require('cors') // ADDED - for avoiding CORS in local dev
// app.use(cors())  // ADDED - for avoiding CORS in local dev
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/* 1. Import the AWS SDK and create an instance of the DynamoDB Document Client */
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

/* 2. create a function that will generate a unique ID for each entry in the database */
function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/* 3. Update the app.get request with the following code for reading all books */
app.get('/items', function (req, res) {
  var params = {
    TableName: 'books-' + process.env.ENV
  }
  docClient.scan(params, function (err, data) {
    if (err) res.json({err})
    else res.json({data})
  })
});

app.get('/items/:id', function (req, res) {
  var params = {
    TableName: 'books-' + process.env.ENV,
    Key: {
      id: req.params.id
    }
  }
  docClient.get(params, function (err, data) {
    if (err) res.json({err})
    else res.json({data})
  })
});

/* 4. Update the app.post request with the following code for creating a new book */
app.post('/items', function (req, res) {
  var params = {
    TableName: 'books-' + process.env.ENV,
    Item: {
      id: req.body.id,
      bookName: req.body.bookName,
      description: req.body.description,
      image: req.body.image,
      book: req.body.book,
    }
  }
  docClient.put(params, function (err, data) {
    if (err) res.json({err})
    else res.json({success: 'Book created successfully!'})
  })
});

app.delete('/items', function(req, res) {
  var params = {
    TableName : 'books-' + process.env.ENV,
    Key: {
      id: req.body.id
    }
  };

  docClient.delete(params, function(err, data) {
    if (err) res.json({err})
    else res.json({success: 'Deleted successfully!'})
  });
});

app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app