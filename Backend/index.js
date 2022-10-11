// i install npm i express,npm i mongoose ,npm i -D nodemon(-d to add dev dependency)
// require is a builtin function that add external module in file 
const connect_to_mongo = require("./db")
var cors = require('cors')
connect_to_mongo();
const express = require('express')
const app = express()
const port = 5000
app.use(express.json())
app.use(cors())
    // available routes (routes means diff addresses)
    // app.use say routes ko link krte hai
    // this /api/<name> ak endpoint hai mtlb jab yeh dalengay url mai to is js file mai chale jaingai
app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/notes", require("./routes/notes.js"))
app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    // What is Middleware? It is those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.


// You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

// Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

// a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: