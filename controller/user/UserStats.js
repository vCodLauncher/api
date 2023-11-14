const { Request, Response } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getUserStats = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                posts: true,
                comments: true,
                stats: {
                    select: {
                        kills: true,
                        deaths: true,
                        headshots: true
                    }
                }
            }
        });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addUserStats = async (req, res) => {
    const { id } = req.params;
    const { kills, deaths, headshots } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                stats: true
            }
        });

        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                stats: {
                    update: {
                        kills: user.stats.kills + kills,
                        deaths: user.stats.deaths + deaths,
                        headshots: user.stats.headshots + headshots,
                    }
                }
            },
            include: {
                stats: true
            }
        });

        res.json({ updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

