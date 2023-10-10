const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const workplaceSchema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  supervisors: [{
    type: ObjectId,
    ref: 'User'
  }],
  departments: [{
    name: {
      type: String,
      required: true
    },
    supervisors: [{
      type: ObjectId,
      ref: 'User'
    }]
  }]
})

const Workplace = mongoose.model('Workplace', workplaceSchema)

module.exports = Workplace
