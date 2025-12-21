import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    // Find the most recent verification code for the email
    const verificationRecord = await prisma.verificationCode.findFirst({
      where: {
        email,
        code,
        purpose: 'signup',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verificationRecord) {
      return NextResponse.json({ error: 'Invalid verification code.' }, { status: 400 });
    }

    if (new Date() > verificationRecord.expiresAt) {
      return NextResponse.json({ error: 'Verification code has expired.' }, { status: 400 });
    }

    if (verificationRecord.verified) {
        return NextResponse.json({ error: 'This code has already been used.' }, { status: 400 });
    }

    // Generate a temporary key for the next step
    const tempKey = randomBytes(32).toString('hex');

    // Mark the code as verified and store the temp key
    await prisma.verificationCode.update({
      where: { id: verificationRecord.id },
      data: {
        verified: true,
        verifiedAt: new Date(),
        tempKey: tempKey,
      },
    });

    return NextResponse.json({ data: { tempKey } });

  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
