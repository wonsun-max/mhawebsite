import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding test users...');

    // Hash password for all test users (password: "test123")
    const passwordHash = await bcrypt.hash('test123', 10);

    // Cleanup existing test users to avoid unique constraint errors
    const testEmails = [
        'admin@mha.test', 'teacher@mha.test', 'student@mha.test',
        'parent@mha.test', 'pending@mha.test'
    ];
    const testUsernames = ['admin', 'teacher', 'student', 'parent', 'pending'];

    await prisma.user.deleteMany({
        where: {
            OR: [
                { email: { in: testEmails } },
                { username: { in: testUsernames } }
            ]
        }
    });
    console.log('🧹 Cleaned up existing test users');

    // 1. Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@mha.test' },
        update: {},
        create: {
            email: 'admin@mha.test',
            username: 'admin',
            passwordHash,
            name: 'Admin User',
            koreanName: '관리자',
            role: UserRole.ADMIN,
            status: 'ACTIVE',
            emailVerified: true,
            verifiedAt: new Date(),
        },
    });
    console.log('✅ Created admin user:', admin.email);

    // 2. Teacher User
    const teacher = await prisma.user.upsert({
        where: { email: 'teacher@mha.test' },
        update: {},
        create: {
            email: 'teacher@mha.test',
            username: 'teacher',
            passwordHash,
            name: 'John Smith',
            koreanName: '김선생',
            role: UserRole.TEACHER,
            status: 'ACTIVE',
            emailVerified: true,
            verifiedAt: new Date(),
        },
    });
    console.log('✅ Created teacher user:', teacher.email);

    // 3. Student User
    const student = await prisma.user.upsert({
        where: { email: 'student@mha.test' },
        update: {},
        create: {
            email: 'student@mha.test',
            username: 'student',
            passwordHash,
            name: 'Jane Doe',
            koreanName: '김학생',
            role: UserRole.STUDENT,
            status: 'ACTIVE',
            grade: 10,
            emailVerified: true,
            verifiedAt: new Date(),
        },
    });
    console.log('✅ Created student user:', student.email);

    // 4. Parent User
    const parent = await prisma.user.upsert({
        where: { email: 'parent@mha.test' },
        update: {},
        create: {
            email: 'parent@mha.test',
            username: 'parent',
            passwordHash,
            name: 'Mary Johnson',
            koreanName: '박학부모',
            role: UserRole.PARENT,
            status: 'ACTIVE',
            studentName: 'Jane Doe',
            emailVerified: true,
            verifiedAt: new Date(),
        },
    });
    console.log('✅ Created parent user:', parent.email);

    // 5. Pending User (awaiting approval)
    const pending = await prisma.user.upsert({
        where: { email: 'pending@mha.test' },
        update: {},
        create: {
            email: 'pending@mha.test',
            username: 'pending',
            passwordHash,
            name: 'Pending User',
            koreanName: '대기중',
            role: UserRole.GUEST,
            status: 'PENDING',
            emailVerified: true,
            verifiedAt: new Date(),
        },
    });
    console.log('⏳ Created pending user:', pending.email);

    console.log('\n🎉 Test users created successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('All users have the same password: test123\n');
    console.log('1. Admin Account:');
    console.log('   Username: admin');
    console.log('   Email: admin@mha.test');
    console.log('   Role: ADMIN\n');
    console.log('2. Teacher Account:');
    console.log('   Username: teacher');
    console.log('   Email: teacher@mha.test');
    console.log('   Role: TEACHER\n');
    console.log('3. Student Account:');
    console.log('   Username: student');
    console.log('   Email: student@mha.test');
    console.log('   Role: STUDENT\n');
    console.log('4. Parent Account:');
    console.log('   Username: parent');
    console.log('   Email: parent@mha.test');
    console.log('   Role: PARENT\n');
    console.log('5. Pending Account (requires approval):');
    console.log('   Username: pending');
    console.log('   Email: pending@mha.test');
    console.log('   Role: GUEST (Status: PENDING)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
