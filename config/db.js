const mongoose = require('mongoose');
const connectDB = () => {
  const dbUrl = process.env.MONGO_DB_URL;
  console.log(`Connecting DB... ${dbUrl}`);
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('Connected to DB...');
    })
    .catch((err) => {
      console.log('error connecting to DB..', err);
    });
};

module.exports = connectDB;
