const mongodb =require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(process.env.MDB)
    .then(client => {
        console.log('connected');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports  = mongoConnect;