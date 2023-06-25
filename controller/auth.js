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
            res.status(404).json({ error: "Invalid credentials" });
        }
        if (user.password === password) {
            const { password, ...userWithoutPassword } = user;

            jsonwebtoken.sign({ userWithoutPassword }, process.env.JWT_SECRET, { expiresIn: '8h' }, (err, token) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                }
                res.json({ token });
            });
        } else {
            res.status(404).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { authUser };
