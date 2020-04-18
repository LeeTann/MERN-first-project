const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Item = new Schema({
    name: {
        type: String,
        required: true
    },    

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Item', Item)