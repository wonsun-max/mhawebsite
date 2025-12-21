import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

export const dynamic = 'force-dynamic';

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
                purpose: 'reset_password',
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!verificationRecord) {
            return NextResponse.json({ error: '잘못된 인증 코드입니다.' }, { status: 400 });
        }

        if (new Date() > verificationRecord.expiresAt) {
            return NextResponse.json({ error: '인증 코드가 만료되었습니다.' }, { status: 400 });
        }

        if (verificationRecord.verified) {
            return NextResponse.json({ error: '이 코드는 이미 사용되었습니다.' }, { status: 400 });
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
