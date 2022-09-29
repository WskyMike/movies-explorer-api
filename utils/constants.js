const {
  JWT_SECRET = 'secret-key',
  PORT = 3030,
  NODE_ENV = 'development',
  MONGODB = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

module.exports = {
  JWT_SECRET,
  MONGODB,
  PORT,
  NODE_ENV,
};
