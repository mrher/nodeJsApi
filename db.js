var mongoClient = require('mongodb').MongoClient;

var state = {
    db: null
};

exports.connect = function (url, done) {
    if (state.db){
        return done();
    }
    
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, database){
        if (err){
            return done(err);
        }
        state.db = database.db('myApi');
        done();
    })
}

exports.get = function (){
    return state.db;
}