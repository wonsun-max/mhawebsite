import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Admin User (reusing logic from create-admin.ts)
  const adminPasswordHash = await bcrypt.hash('Admin123!@#', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mhaschool.com' },
    update: {
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      name: 'Admin',
      koreanName: '관리자',
      emailVerified: true,
      verifiedAt: new Date(),
      approvedAt: new Date(),
      nickname: '관리자닉',
    },
    create: {
      username: 'admin',
      email: 'admin@mhaschool.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      name: 'Admin',
      koreanName: '관리자',
      emailVerified: true,
      verifiedAt: new Date(),
      approvedAt: new Date(),
      nickname: '관리자닉',
    },
  });
  console.log(`Created/Updated admin user with ID: ${adminUser.id}`);

  // 2. Create a Sample Student User
  const studentPasswordHash = await bcrypt.hash('Student123!', 10);
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@mhaschool.com' },
    update: {
      passwordHash: studentPasswordHash,
      role: 'STUDENT',
      status: 'ACTIVE',
      name: 'Student',
      koreanName: '김학생',
      emailVerified: true,
      verifiedAt: new Date(),
      approvedAt: new Date(),
      grade: 10,
      nickname: '익명학생',
    },
    create: {
      username: 'student',
      email: 'student@mhaschool.com',
      passwordHash: studentPasswordHash,
      role: 'STUDENT',
      status: 'ACTIVE',
      name: 'Student',
      koreanName: '김학생',
      emailVerified: true,
      verifiedAt: new Date(),
      approvedAt: new Date(),
      grade: 10,
      nickname: '익명학생',
    },
  });
  console.log(`Created/Updated student user with ID: ${studentUser.id}`);

  // 3. Create Sample Posts
  const post1 = await prisma.boardPost.create({
    data: {
      title: '관리자가 작성한 첫 게시글입니다.',
      content: '이 게시글은 관리자 계정으로 작성되었습니다. 자유롭게 의견을 남겨주세요.',
      category: 'FREE_BOARD',
      authorId: adminUser.id,
      views: 10,
    },
  });
  console.log(`Created post with ID: ${post1.id}`);

  const post2 = await prisma.boardPost.create({
    data: {
      title: '학생이 작성한 일반 게시글입니다.',
      content: '안녕하세요! 저는 김학생입니다. 학교생활에 대한 질문이 있어요.',
      category: 'FREE_BOARD',
      authorId: studentUser.id,
      views: 5,
    },
  });
  console.log(`Created post with ID: ${post2.id}`);

  const post3 = await prisma.boardPost.create({
    data: {
      title: '학생이 익명으로 작성한 게시글입니다.',
      content: '익명으로 질문합니다. 시험 범위가 정확히 어디까지인가요?',
      category: 'FREE_BOARD',
      authorId: studentUser.id,
      anonymousNickname: '익명학생',
      views: 12,
    },
  });
  console.log(`Created post with ID: ${post3.id}`);

  // 4. Create Sample Comments
  await prisma.comment.create({
    data: {
      text: '첫 게시글 감사합니다!',
      postId: post1.id,
      authorId: studentUser.id,
    },
  });
  await prisma.comment.create({
    data: {
      text: '관리자님, 좋은 정보 감사합니다.',
      postId: post1.id,
      authorId: adminUser.id,
    },
  });
  await prisma.comment.create({
    data: {
      text: '시험 범위는 공지사항을 확인해주세요!',
      postId: post3.id,
      authorId: adminUser.id,
    },
  });
  console.log('Created sample comments.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
