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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #0A1929; text-align: center;">이메일 인증</h2>
          <p style="color: #555; font-size: 16px;">안녕하세요,</p>
          <p style="color: #555; font-size: 16px;">MHA 공식 웹사이트 회원가입을 위한 인증 코드입니다.</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #2563EB;">${code}</span>
          </div>
          <p style="color: #999; font-size: 14px; text-align: center;">이 코드는 10분간 유효합니다.</p>
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