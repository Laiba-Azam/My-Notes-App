const jwt = require('jsonwebtoken');
const jwt_secret = `${process.env.TOKEN_SECRET}`
    // next will be the last argument in our case it is async[req,res]

const fetchuser = async(req, res, next) => {
    // get the user info from token and use add id to req object
    // header ka name Tokem rakha hai

    const token = await req.header('TOKEN');
    if (!token) {
        res.status(401).send({ error: "Use valid token" })
    }
    const string = await jwt.verify(token, jwt_secret);

    req.user = await string.user
        // req.user jaiga auth mai id mai
    next()

}

module.exports = fetchuser;