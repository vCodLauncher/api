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
        const decoded = jsonwebtoken.decode(req.headers.authorization.split(' ')[1])
        res.json( { user : decoded.userWithoutPassword});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = { authUser, getMe };
