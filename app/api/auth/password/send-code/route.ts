import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomInt } from 'crypto';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendPasswordResetEmail(email: string, code: string) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email credentials are missing in .env.local');
        console.log(`[MOCK EMAIL] Password Reset - To: ${email}, Code: ${code}`);
        return { success: true };
    }

    try {
        await transporter.sendMail({
            from: `"MHA Web" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'MHA Web - 비밀번호 재설정 코드',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #0A1929; text-align: center;">비밀번호 재설정</h2>
          <p style="color: #555; font-size: 16px;">안녕하세요,</p>
          <p style="color: #555; font-size: 16px;">비밀번호 재설정을 위한 인증 코드입니다.</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #2563EB;">${code}</span>
          </div>
          <p style="color: #999; font-size: 14px; text-align: center;">이 코드는 10분간 유효합니다.</p>
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">본인이 요청하지 않은 경우 이 이메일을 무시하세요.</p>
        </div>
      `,
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
}

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: '해당 이메일로 등록된 계정을 찾을 수 없습니다.' }, { status: 404 });
        }

        // Check if user has a password (not just OAuth)
        if (!user.passwordHash) {
            return NextResponse.json({ error: '이 계정은 비밀번호 로그인을 사용하지 않습니다.' }, { status: 400 });
        }

        const code = randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete any existing reset codes for this email
        await prisma.verificationCode.deleteMany({
            where: {
                email,
                purpose: 'reset_password',
            },
        });

        // Create new verification code
        await prisma.verificationCode.create({
            data: {
                email,
                code,
                expiresAt,
                purpose: 'reset_password',
            },
        });

        // Send the code via email
        const emailResult = await sendPasswordResetEmail(email, code);

        if (!emailResult.success) {
            return NextResponse.json({ error: 'Failed to send verification email. Please check server logs.' }, { status: 500 });
        }

        return NextResponse.json({ message: '인증 코드가 이메일로 전송되었습니다.' });

    } catch (error) {
        console.error('Error sending password reset code:', error);
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}
