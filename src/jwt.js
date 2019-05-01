const fs = require('fs');
const jwt = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
const privateKEY = fs.readFileSync('./src/keys/private.key', 'utf8');
const publicKEY = fs.readFileSync('./src/keys/public.key', 'utf8');

const options = {
    issuer: 'jsguys',
    subject: 'whatever@whatever.com',
    audience: 'whatever'
};

module.exports = {
    sign: (payload) => {
        // Token signing options
        options.expiresIn = "30d";    // 30 days validity
        options.algorithm = "RS256";

        return jwt.sign(payload, privateKEY, options);
    },
    verify: (token) => {
        options.expiresIn = "30d";
        options.algorithm = ["RS256"];

        try {
            return jwt.verify(token, publicKEY, options);
        } catch (err) {
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, { complete: true });
        //returns null if token is invalid
    }
}