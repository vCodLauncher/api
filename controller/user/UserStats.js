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
        let userStats = await prisma.userStats.findUnique({
            where: {
                userId: Number(id),
            }
        });

        if (!userStats) {
            userStats = await prisma.userStats.create({
                data: {
                    userId: Number(id),
                    kills: 0,
                    deaths: 0,
                    headshots: 0,
                }
            });
        }

        const updatedUserStats = await prisma.userStats.update({
            where: {
                userId: Number(id),
            },
            data: {
                kills: userStats.kills + kills,
                deaths: userStats.deaths + deaths,
                headshots: userStats.headshots + headshots,
            }
        });

        res.json({ updatedUserStats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getUserStats, addUserStats };

