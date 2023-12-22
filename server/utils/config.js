
require('dotenv').config()


const ENVIRONMENT = process.env.NODE_ENV

// import MONGODB_URI from .env
const MONGODB_URI = ENVIRONMENT === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

// import PORT from .env
const PORT = process.env.PORT

// import JWT_SECRET from .env
const JWT_SECRET = process.env.JWT_SECRET

// import ALLOWED_ORIGINS from .env
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS

// this is host domain for email service
const EMAIL_SERVICE_HOST = process.env.EMAIL_SERVICE_HOST

// this is port for email service
const EMAIL_SERVICE_PORT = process.env.EMAIL_SERVICE_PORT

// this is email service provider
const EMAIL_SERVICE = process.env.EMAIL_SERVICE

// this is domain host's email account 
const EMAIL_SERVICE_USER = process.env.EMAIL_SERVICE_USER

// this is domain host's email account password
const EMAIL_SERVICE_PASSWORD = process.env.EMAIL_SERVICE_PASSWORD

// this is email's header from field
const EMAIL_SERVICE_FROM = process.env.EMAIL_SERVICE_FROM

module.exports = {
  ENVIRONMENT,
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  ALLOWED_ORIGINS,
  EMAIL_SERVICE_HOST,
  EMAIL_SERVICE_PORT,
  EMAIL_SERVICE,
  EMAIL_SERVICE_USER,
  EMAIL_SERVICE_PASSWORD,
  EMAIL_SERVICE_FROM
}
