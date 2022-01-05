require("dotenv").config();
const jwt = require("jsonwebtoken");

class JWTAuthService {
    constructor() {
        this.secret = process.env.TOKEN_KEY;
    }
    
    JWTIssuer(payload, expiresIn) {
        try {
            return jwt.sign(payload, this.secret, {expiresIn});
        } catch(err) {
            console.log(err);
        }
    }

    JWTVerify(token) {
        try {
            return jwt.verify(token, this.secret);
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = JWTAuthService;