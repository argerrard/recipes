const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const jwtSecret = config.jwtSecret;

function auth(req, res, next) {
    //Get token from request header
    const token = req.header('x-auth-token');

    //Ensure that token is sent with request
    if (!token) {
        return res.status(401).json({ errors: ['A token is required to access this route.'] });
    }

    //Verify token
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ errors: ['Invalid token.'] });
        }

        //If token is valid, call the next function and attach the user to the request
        req.user = decoded;
        next();
    });
}

module.exports = auth;