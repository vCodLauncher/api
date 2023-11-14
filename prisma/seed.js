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
            password: 'password123',
        },
    });

}

run()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
