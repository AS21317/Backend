const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const createError = require('http-errors');
dotenv.config();
const secret = process.env.JWT_SECRET;

const signAccessToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: user._id,
            role: user.role
        };
        const options = {
            expiresIn: '1d',
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                reject(createError.InternalServerError());
            }
            resolve(token);
        });
    });
}

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                reject(createError.Unauthorized(message));
            }
            resolve(payload);
        });
    });
}

module.exports = {
    signAccessToken,
    verifyAccessToken
}