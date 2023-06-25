const { NextFunction, Request, Response } = require("express");
const jsonwebtoken = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No valid token provided' });
    }

    const tokenValue = token.split(' ')[1];

    jsonwebtoken.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded.userWithoutPassword;
        next();
    });
}

module.exports = { verifyToken };
