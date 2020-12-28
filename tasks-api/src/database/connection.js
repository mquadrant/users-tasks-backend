const mongoose = require('mongoose');
var config = require('../config');

module.exports = class Database {
    constructor(connection = config.env === 'production' ? config.mongo.uri_prod : config.mongo.uri) {
        this.connection = connection;

        return mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
};