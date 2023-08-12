const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BannerController {
    // Create a new banner
    async createBanner(req, res) {
        try {
            const banner = await prisma.banner.create({
                data: req.body
            });
            res.status(201).json(banner);
        } catch (err) {
            res.status(400).json({ message: 'Error', error: err });
        }
    }

    // Delete a banner by id
    async deleteBanner(req, res) {
        try {
            await prisma.banner.delete({
                where: { id: Number(req.params.id) }
            });
            res.status(200).json({ message: 'Success' });
        } catch (err) {
            res.status(400).json({ message: 'Error', error: err });
        }
    }

    // Modify a banner
    async modifyBanner(req, res) {
        try {
            const updatedBanner = await prisma.banner.update({
                where: { id: Number(req.params.id) },
                data: req.body
            });
            res.status(200).json(updatedBanner);
        } catch (err) {
            res.status(400).json({ message: 'Error', error: err });
        }
    }

    // List all banners
    async listBanner(req, res) {
        try {
            const banners = await prisma.banner.findMany();
            res.status(200).json(banners);
        } catch (err) {
            res.status(400).json({ message: 'Error', error: err });
        }
    }

    // Verifiy disponibility of a banner
    async getBannerAvailability(req, res) {
        try {
            const banner = await prisma.banner.findUnique({
                where: { id: Number(req.params.id) }
            });

            if (!banner) {
                return res.status(404).json({ message: 'Error' });
            }

            res.status(200).json({ isAvailable: banner.isAvailable });
        } catch (err) {
            res.status(400).json({ message: 'Error', error: err });
        }
    }

    // Attribute a banner to a user
    async giveBannerUser(req, res) {
        try {
            const { userId } = req.body;

            const updatedBanner = await prisma.banner.update({
                where: { id: Number(req.params.id) },
                data: {
                    userId: userId,
                    isAvailable: false
                }
            });

            res.status(200).json(updatedBanner);
        } catch (err) {
            res.status(400).json({ message: 'Error', error: err });
        }
    }

    // Delete a banner from an user
    async deleteBannerUser(req, res) {
        try {
            const updatedBanner = await prisma.banner.update({
                where: { id: Number(req.params.id) },
                data: {
                    userId: null,
                    isAvailable: true
                }
            });

            res.status(200).json(updatedBanner);
        } catch (err) {
            res.status(400).json({ message: 'Error', error: err });
            }
        }
}

module.exports = BannerController;
