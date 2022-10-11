const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
// humne isko model banaia hai user iska name hai or Userschema is the schema
const User = mongoose.model('user', UserSchema)
User.createIndexes()
module.exports = User