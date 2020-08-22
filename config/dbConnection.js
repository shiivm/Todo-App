const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

const dbConnection = mongoose
  .connect(process.env.MONGO_URI || '', dbConfig)
  .then((db) => {
    console.log('Mongo Connected...');
    return db;
  })
  .catch((err) => {
    console.error(`Connecting to Mongo Failed. Error: ${err.message}`);
  });

module.exports = dbConnection;