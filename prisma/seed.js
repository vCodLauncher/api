const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function run() {

    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            firstName: 'User',
            lastName: 'Example',
            password: 'password123', // Add a password property here
        },
    });

    console.log(user);
}

run()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
