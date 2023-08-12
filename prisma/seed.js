const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const img = '/banner/test.webp'

async function run() {

    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            nickname: 'nickLaTrick',
            password: 'password123', // Add a password property here
        },
    });

    const banner = await prisma.banner.upsert({
        where: {id : 1},
        update : {},
        create: {
            imageUrl: img,
        }
    })

    const room = await prisma.room.upsert({
        where: { id: 1 },
        update: {},
        create: {
            maxPlayers: 8,
        },
    });

    console.log(room);
}

run()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
