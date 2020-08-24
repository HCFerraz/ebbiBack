const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const database = mongoose.connection;

database.once('open', () => console.log('MongoDB connected'));
database.on('error', console.error.bind(console, "Couldn't connect to database"));

module.exports = database 