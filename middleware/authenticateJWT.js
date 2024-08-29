const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

// middleware to check if the user is authenticated
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    // no token
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecretKey, (err, user) => {
        // invalid token
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;
