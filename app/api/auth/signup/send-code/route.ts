import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomInt } from 'crypto';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
// Note: The user must provide EMAIL_USER and EMAIL_PASS in .env.local
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendVerificationEmail(email: string, code: string) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials are missing in .env.local');
    // Fallback to mock if credentials are missing (for dev safety)
    console.log(`[MOCK EMAIL] To: ${email}, Code: ${code}`);
    return { success: true };
  }

  try {
    await transporter.sendMail({
      from: `"MHA Web" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'MHA - 이메일 인증 코드',
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 500px; margin: 40px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid #f0f0f0;">
          <div style="background-color: #0A1929; padding: 40px 20px; text-align: center;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Manila Hankuk Academy</h1>
            <p style="color: #ffffff; opacity: 0.8; margin-top: 8px; font-size: 14px;">Nurturing Minds, Inspiring Hearts</p>
          </div>
          <div style="padding: 40px 30px; text-align: center;">
            <h2 style="color: #333333; font-size: 22px; margin-bottom: 10px;">이메일 인증 안내</h2>
            <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              안녕하세요!<br/>
              MHA 공식 웹사이트 가입을 위해 아래의 인증 코드를 입력해 주세요.
            </p>
            <div style="background-color: #f8fafc; border: 2px dashed #D4AF37; padding: 25px; border-radius: 16px; margin: 30px 0;">
              <span style="font-size: 36px; font-weight: 800; letter-spacing: 12px; color: #0A1929; font-family: monospace;">${code}</span>
            </div>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 20px;">
              이 코드는 보안을 위해 <strong>10분간</strong>만 유효합니다.
            </p>
          </div>
          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              본 메일은 발신 전용입니다. 문의사항은 학교 사무실로 연락 부탁드립니다.<br/>
              © 2024 Manila Hankuk Academy. All rights reserved.
            </p>
          </div>
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

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'This email is already in use.' }, { status: 409 });
    }

    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store the verification code
    await prisma.verificationCode.create({
      data: {
        email,
        code,
        expiresAt,
        purpose: 'signup',
      },
    });

    // Send the code via email
    const emailResult = await sendVerificationEmail(email, code);

    // If email fails but we are in dev/test without creds, it might have fallen back to mock which returns success: true
    // If it actually failed (credentials present but wrong), we should probably let the user know
    if (!emailResult.success) {
      return NextResponse.json({ error: 'Failed to send verification email. Please check server logs.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Verification code sent successfully.' });

  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}