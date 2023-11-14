const { Request, Response } = require('express');
const { PrismaClient } = require('@prisma/client');
const jsonwebtoken = require('jsonwebtoken');

// auth user
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "Invalid credentials" });
        }
        if (user.password === password) {
            const { password, ...userWithoutPassword } = user;
            jsonwebtoken.sign({ userWithoutPassword }, process.env.JWT_SECRET, { expiresIn: '8h' }, (err, token) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.json({ token });
            });
        } else {
            return res.status(404).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

const getMe = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        const decoded = jsonwebtoken.decode(token);

        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ error: 'Token has expired' });
        }

        if (!decoded.userWithoutPassword) {
            return res.status(401).json({ error: 'User information missing in token' });
        }

        res.json({ user: decoded.userWithoutPassword });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { authUser, getMe };
