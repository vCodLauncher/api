const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


    const getBanner = async (req, res) => {
        const { id } = req.params;
        try {
            const banner = await prisma.banner.findUnique({
                where: {
                    id: Number(id),
                }
            });
            res.json({ banner });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


module.exports = getBanner;
