
import { PrismaClient } from '@prisma/client';
import { semester } from './lib/calendarData';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding semesters...');

    for (const sem of semester) {
        const createdSem = await prisma.semester.upsert({
            where: { id: sem.id },
            update: {
                name: sem.name,
                image: sem.image,
                pdf: sem.pdf,
            },
            create: {
                id: sem.id,
                name: sem.name,
                image: sem.image,
                pdf: sem.pdf,
            }
        });
        console.log(`Upserted semester: ${createdSem.name}`);

        // Optional: Link existing events to this semester if they match dates?
        // Or just rely on the migration endpoint for events.
        // Since the user wants "make it the same", we should probably ensure events are there too.
        // Let's just seed the semesters for now as that's the new part.
    }

    const count = await prisma.semester.count();
    console.log(`Total semesters in DB: ${count}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
