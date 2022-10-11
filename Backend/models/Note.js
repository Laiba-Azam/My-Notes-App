const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    // user is a a forigner key for notes.js .simple like foriegner key of different database
    // islay forigner key add kia hai take particular user ko uskay notes say link krsakte hai
    // in ref you add model and in our case model name is user(check in file User.js last line)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'

    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,
        default: "general",
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
// humne isko model banaia hair user iska name hai or Userschema is the schema
module.exports = mongoose.model('notes', NotesSchema)