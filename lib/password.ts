import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Validate password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('비밀번호에 대문자가 포함되어야 합니다');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('비밀번호에 소문자가 포함되어야 합니다');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('비밀번호에 숫자가 포함되어야 합니다');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('비밀번호에 특수문자가 포함되어야 합니다');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
