const mongoose = require('mongoose');

module.exports = function connectDB() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.error('MONGO_URL not set in env');
    process.exit(1);
  }

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB connected');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
};
