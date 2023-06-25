const { Request, Response } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new user
const createUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password ) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
    let dataSchema = {
        firstName,
        lastName,
        email,
        password,
    };
    if (role) {
        dataSchema = {
            ...dataSchema,
            role
        };
    }
    try {
        const user = await prisma.user.create({
            data: dataSchema
        });
        res.status(201).json({ user });
    } catch (error) {
        //if user already exists
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "A user with this email already exists" });
        }
        res.status(500).json({ error: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user by id
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            }
        });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user by id
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    if (!firstName && !lastName && !email && !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                firstName,
                lastName,
                email,
                password
            }
        });
        res.json({ user });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "No user found with this id" });
        }
        res.status(500).json({ error: error.message });
    }
};

// Delete user by id
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(id),
            }
        });
        res.json({ user });
    } catch (error) {
        // if no user found
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "No user found with this id" });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
