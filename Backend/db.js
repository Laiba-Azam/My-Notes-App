const mongoose = require("mongoose")
const monUri = "mongodb://localhost:27017/inotebook"
const connect_to_mongo = () => {
    mongoose.connect(monUri, () => {
        console.log("connected")
    })
}
module.exports = connect_to_mongo;