import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      tempKey,
      username,
      password,
      role,
      name,
      koreanName,
      birthdate,
      gender,
      age,
      grade,
      studentName,
    } = body;

    // Basic validation
    if (!tempKey || !username || !password || !role || !name || !koreanName || !birthdate || !gender || !age) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Validate username format (English, numbers, underscore, period only)
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      return NextResponse.json({ error: 'Username must contain only English letters, numbers, underscores, and periods.' }, { status: 400 });
    }

    // Find the verification record by the tempKey
    const verificationRecord = await prisma.verificationCode.findUnique({
      where: { tempKey },
    });

    if (!verificationRecord || !verificationRecord.verified) {
      return NextResponse.json({ error: 'Invalid or unverified session. Please start over.' }, { status: 403 });
    }

    // Check if the tempKey has expired (e.g., 15 minutes after verification)
    const tempKeyExpiry = new Date(verificationRecord.verifiedAt!.getTime() + 15 * 60 * 1000);
    if (new Date() > tempKeyExpiry) {
      return NextResponse.json({ error: 'Your session has expired. Please start over.' }, { status: 403 });
    }

    const email = verificationRecord.email;

    // Check if username or email already exist
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    if (existingUser) {
      return NextResponse.json({ error: 'Username or email is already in use.' }, { status: 409 });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user
    await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        role: role as UserRole,
        name,
        koreanName,
        birthdate: new Date(birthdate),
        gender,
        age,
        grade,
        studentName,
        status: 'PENDING', // Require admin approval
        emailVerified: true, // Email is verified at this point
        verifiedAt: verificationRecord.verifiedAt,
      },
    });

    // Invalidate the tempKey by deleting the verification record
    await prisma.verificationCode.delete({ where: { id: verificationRecord.id } });

    return NextResponse.json({ message: 'Signup successful. Your account is pending admin approval.' }, { status: 201 });

  } catch (error) {
    console.error('Error completing signup:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
