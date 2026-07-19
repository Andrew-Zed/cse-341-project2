const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.warn('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            console.log('Connected to the database');
            callback(null, database);
        })
        .catch((err) => {
            console.error('Failed to connect to the database:', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized. Call initDb first.');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase,
};
