const jwt = require('jsonwebtoken');
const JWT_ENCRIPTION_PASSWORD = process.env.JWT_ENCRIPTION_PASSWORD || 'my_encryption_password'


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(' ')[1]; // Bearer xx.yy.zz
    if (token === 'null') {
        return res.status(401).send("Unauthorized request");
    }
    let payload = jwt.verify(token, JWT_ENCRIPTION_PASSWORD);
    if (!payload){
        return res.status(401).send("Unauthorized request");
    }
    req.userId  = payload.userId;
    req.isAdmin = payload.isAdmin;
    next();
}

module.exports = verifyToken