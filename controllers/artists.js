var artists = require('../models/artists');

exports.all = function (req, res) {
    artists.all(function (err, docs){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
}

exports.findById = function (req, res) {
    artists.findById(req.params.id, function (err, doc){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
}

exports.create = function (req, res) {
    var artist = {
        //id: Date.now(),
        name: req.body.name.toString()
    }
    artists.create(artist, function (err, result){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
}

exports.update = function (req, res) {
    artists.update(req.params.id, { $set: { name: req.body.name } },  function (err, doc){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        //res.sendStatus(200);
        res.send(doc);
    })
}

exports.delete = function (req, res) {
    artists.delete(req.params.id, function (err, doc){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        //res.sendStatus(200);
        res.send(doc);
    })
}