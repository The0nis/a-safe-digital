export default {
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/aSafeDigitalDb', 
  AUTH_SECRET: process.env.AUTH_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  API_SERVER_BASE_URL: process.env.API_SERVER_BASE_URL
};