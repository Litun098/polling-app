const mongoose = require('mongoose');

const connect = () => {
    console.log("MongoDB connection requested");

    return mongoose. connect("mongodb://127.0.0.1:27017/polling_db");
}

module.exports = {
    connect
}