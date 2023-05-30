// import dotenv from 'dotenv'
require('dotenv').config()

// import MONGODB_URI from .env
const MONGODB_URI = process.env.MONGODB_URI

// import PORT from .env
const PORT = process.env.PORT

// import JWT_SECRET from .env
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET
}
