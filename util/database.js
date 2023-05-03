const mongodb =require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Priya:abcd@cluster0.ybb47ei.mongodb.net/test')
    .then(client => {
        console.log('connected');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports  = mongoConnect;