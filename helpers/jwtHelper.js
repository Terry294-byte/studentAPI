const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    signAccessToken: (UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '10m',
                issuer: 'EddTechnologies.com',
                audience: UserId
            };

            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    signRefreshToken: (UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: '1y',
                issuer: 'EddTechnologies.com',
                audience: UserId
            };

            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },


    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) {
            return next(createError.Unauthorized()); // Reject request if no token is found
        }

        const authHeader = req.headers['authorization']; // Extract authorization header
        const bearerToken = authHeader.split(' '); // Split "Bearer <token>"
        const token = bearerToken[1]; // Extract the actual token

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return next(createError.Unauthorized()); // Invalid token
                } else {
                    return next(createError.Unauthorized(err.message)); // Other JWT errors
                }
            }

            req.payload = payload; // Attach decoded payload to request object
            next(); // Proceed to the next middleware or route handler
        });
    }
};
