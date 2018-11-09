var mongoClient = require('mongodb').MongoClient;

var state = {
    db: null
};

exports.connect = function (url, done) {
    if (state.db){
        return done();
    }
    
    mongoClient.connect(url, function(err, db){
        if (err){
            return done(err);
        }
        state.db = db.db('myApi');
        done();
    })
}