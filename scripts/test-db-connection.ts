import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log('🔍 Testing database connection...');

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error('❌ DATABASE_URL is not defined in the environment!');
        return;
    }

    // Safely log the host
    try {
        const url = new URL(dbUrl);
        console.log(`ℹ️  Target Database Host: ${url.hostname}`);
    } catch (e) {
        console.log('⚠️  Could not parse DATABASE_URL to extract hostname');
    }

    try {
        // Set a timeout for the connection
        const userCount = await Promise.race([
            prisma.user.count(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out after 5s')), 5000))
        ]);
        console.log(`✅ Successfully connected to database! Found ${userCount} users.`);
    } catch (e) {
        console.error('❌ Database connection failed:');
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
