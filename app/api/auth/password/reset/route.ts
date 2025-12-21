import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { tempKey, newPassword } = await request.json();

        if (!tempKey || !newPassword) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        // Validate password strength
        if (newPassword.length < 8) {
            return NextResponse.json({ error: '비밀번호는 최소 8자 이상이어야 합니다.' }, { status: 400 });
        }

        // Find the verification record by the tempKey
        const verificationRecord = await prisma.verificationCode.findUnique({
            where: { tempKey },
        });

        if (!verificationRecord || !verificationRecord.verified) {
            return NextResponse.json({ error: 'Invalid or unverified session. Please start over.' }, { status: 403 });
        }

        // Check if the tempKey has expired (15 minutes after verification)
        const tempKeyExpiry = new Date(verificationRecord.verifiedAt!.getTime() + 15 * 60 * 1000);
        if (new Date() > tempKeyExpiry) {
            return NextResponse.json({ error: '세션이 만료되었습니다. 다시 시도해주세요.' }, { status: 403 });
        }

        const email = verificationRecord.email;

        // Find the user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        // Hash the new password
        const passwordHash = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
            },
        });

        // Delete the verification record
        await prisma.verificationCode.delete({ where: { id: verificationRecord.id } });

        return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' }, { status: 200 });

    } catch (error) {
        console.error('Error resetting password:', error);
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}
