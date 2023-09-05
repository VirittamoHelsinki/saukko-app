const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const { manyUsers } = require('./test_data')

const api = supertest(app)
const User = require('../models/userModel')

beforeEach(async () => {
    await User.deleteMany({})

    await manyUsers.forEach(async user => {
        await api.post('/auth')
                 .send(user)
    })

})

describe('auth api tests', () => {
    
    test('post /auth/login returns 200 with valid email and password', async () => {
        const response =
            await api.post('/auth/login')
                     .send(manyUsers[0])
                     .expect(200)
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})