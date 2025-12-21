import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send verification code email
 */
export async function sendVerificationEmail(email: string, code: string, purpose: 'signup' | 'reset'): Promise<boolean> {
  try {
    const subject = purpose === 'signup'
      ? '마닐라한국아카데미 - 이메일 인증'
      : '마닐라한국아카데미 - 비밀번호 재설정';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">${subject}</h2>
        <p>안녕하세요,</p>
        <p>${purpose === 'signup' ? '회원가입을' : '비밀번호 재설정을'} 위한 인증 코드입니다:</p>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #1f2937; letter-spacing: 5px; margin: 0;">${code}</h1>
        </div>
        <p>이 코드는 10분간 유효합니다.</p>
        <p>본인이 요청하지 않은 경우, 이 이메일을 무시하세요.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="color: #6b7280; font-size: 12px;">
          마닐라한국아카데미<br />
          이메일: hankukac@hanmail.net
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"마닐라한국아카데미" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send approval notification email
 */
export async function sendApprovalEmail(email: string, username: string, approved: boolean): Promise<boolean> {
  try {
    const subject = approved
      ? '마닐라한국아카데미 - 계정 승인 완료'
      : '마닐라한국아카데미 - 계정 승인 거부';

    const html = approved
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">계정이 승인되었습니다!</h2>
          <p>안녕하세요, ${username}님</p>
          <p>귀하의 계정이 관리자에 의해 승인되었습니다.</p>
          <p>이제 로그인하여 모든 서비스를 이용하실 수 있습니다.</p>
          <a href="${process.env.NEXTAUTH_URL}/login" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            로그인하기
          </a>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">계정 승인이 거부되었습니다</h2>
          <p>안녕하세요, ${username}님</p>
          <p>귀하의 계정 승인이 거부되었습니다.</p>
          <p>자세한 사항은 학교로 문의해주시기 바랍니다.</p>
        </div>
      `;

    await transporter.sendMail({
      from: `"마닐라한국아카데미" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error('Error sending approval email:', error);
    return false;
  }
}
