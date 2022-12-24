const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const connectDB = require('./config/db');
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Connect To DB
connectDB();

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
