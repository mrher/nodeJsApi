var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');
var artistsController = require('./controllers/artists');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//var artists = [
//    {
//       id: 1,
//       name: 'Metallica'
//    },
//    {
//       id: 2,
//       name: 'Iron Maden'
//    },
//    {
//       id: 3,
//       name: 'Deep Purple'
//    }
//];

app.get('/', function(req, res){
    res.send('hello api');
})

app.get('/artists', artistsController.all);
//app.get('/artists', function(req, res){
//    db.get().collection('artists').find().toArray(function(err, docs){
//        if(err){
//            console.log(err);
//            return res.SendStatus(500);
//        }
//        res.send(docs);
//    })
    //res.send(artists);
//});

app.post('/artists', function(req, res){
    var artist = {
        //id: Date.now(),
        name: req.body.name.toString()
    }
    db.get().collection('artists').insertOne(artist, function(err, result){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    });
    //artists.push(artist);
    //res.send(artist);
})

app.put('/artists/:id', function(req, res){
    db.get().collection('artists').updateOne(
        { _id: new ObjectID(req.params.id) },
        { $set: { name: req.body.name } },
        function (err, result) {
            if (err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
//    var artist = artists.find(function(artist){
//        return artist.id === Number(req.params.id)
//    });
//    artist.name = req.body.name;
//    //res.send(artist);
//    res.sendStatus(200);
})

app.delete('/artists/:id', function(req, res){
    db.get().collection('artists').deleteOne(
        { _id: new ObjectID(req.params.id) },
        function (err, result) {
            if (err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
//    artists = artists.filter(function(artist){
//       return artist.id !== Number(req.params.id) 
//    })
//    res.sendStatus(200);
})

app.get('/artists/:id', function(req, res){
    console.log(req.params);
    var artist = artists.find(function(artist){
        return artist.id === Number(req.params.id)
    });
    res.send(artist);
});



db.connect('mongodb://localhost:27017/myApi', function(err){
    if (err){
        return console.log(err);
    }
    app.listen(3012, function(){
        console.log('API app started on locahost:3012');
    })
});