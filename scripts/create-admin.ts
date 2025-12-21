import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local
dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env.local') });

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { username: 'admin' },
    });

    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      console.log('Username: admin');
      console.log('You may need to reset the password manually.');
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash('Admin123!@#', 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@mhaschool.com',
        passwordHash,
        role: 'ADMIN',
        status: 'ACTIVE',
        name: 'Admin',
        koreanName: '관리자',
        emailVerified: true,
        verifiedAt: new Date(),
        approvedAt: new Date(),
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Username: admin');
    console.log('Password: Admin123!@#');
    console.log('Email: admin@mhaschool.com');
    console.log('Role: ADMIN');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('You can now login at: http://localhost:3003/auth/login');
    console.log('⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
