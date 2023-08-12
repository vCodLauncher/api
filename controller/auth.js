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
        // Vérifier si le header Authorization existe dans la requête
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        // Diviser la chaîne d'autorisation pour obtenir le token
        const token = req.headers.authorization.split(' ')[1];

        // Vérifier si le token est vide
        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        // Décoder le token
        const decoded = jsonwebtoken.decode(token);

        // Vérifier si le décodage a réussi
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Vérifier si le token a expiré
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ error: 'Token has expired' });
        }

        // Vérifier si le décodage contient les informations de l'utilisateur
        if (!decoded.userWithoutPassword) {
            return res.status(401).json({ error: 'User information missing in token' });
        }

        // Renvoyer les informations de l'utilisateur sans le mot de passe
        res.json({ user: decoded.userWithoutPassword });
    } catch (error) {
        // Gérer les erreurs et renvoyer une réponse appropriée
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { authUser, getMe };
