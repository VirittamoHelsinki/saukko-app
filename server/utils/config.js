// import dotenv from 'dotenv'
require('dotenv').config()

// import MONGODB_URI from .env
const MONGODB_URI = process.env.MONGODB_URI

// import PORT from .env
const PORT = process.env.PORT

// import JWT_SECRET from .env
const JWT_SECRET = process.env.JWT_SECRET

// import ALLOWED_ORIGINS from .env
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS

module.exports = {
  ALLOWED_ORIGINS,
  MONGODB_URI,
  PORT,
  JWT_SECRET
}
