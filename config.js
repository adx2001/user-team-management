require('dotenv').config();

module.exports = {
  mongoURL: process.env.MONGO_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};
