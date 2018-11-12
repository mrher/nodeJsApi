var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');
var artistsController = require('./controllers/artists');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.send('hello api');
})

app.get('/artists', artistsController.all);

app.post('/artists', artistsController.create);

app.put('/artists/:id', artistsController.update);

app.delete('/artists/:id', artistsController.delete);

app.get('/artists/:id', artistsController.findById);



db.connect('mongodb://localhost:27017/myApi', function(err){
    if (err){
        return console.log(err);
    }
    app.listen(3012, function(){
        console.log('API app started on locahost:3012');
    })
});