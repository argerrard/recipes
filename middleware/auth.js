const config = '../config/config.json';
const jwt = require('jsonwebtoken');
const jwtSecret = config.jwtSecret;


function auth(req, res, next) {
    //Get token from request header
    const token = req.header('x-auth-token');

    //Ensure that token is sent with request
    if (!token) {
        res.status(401).json({ errors: ['A JSON web token is required to access this route.'] });
        return;
    }

    //Verify token
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            res.status(401).json({ errors: ['Invalid token.'] });
            return;
        }

        //If token is valid, call the next function and attach the user to the request
        req.user = decoded;
        next();
    });
}

module.exports = auth;