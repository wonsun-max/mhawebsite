import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret-change-in-production';

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

/**
 * Generate Access Token (15 minutes)
 */
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m',
    issuer: 'mha-school',
  });
}

/**
 * Generate Refresh Token (30 days)
 */
export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: '30d',
    issuer: 'mha-school',
  });
}

/**
 * Verify Access Token
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'mha-school',
    }) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Verify Refresh Token
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET, {
      issuer: 'mha-school',
    }) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Hash token for storage (SHA256)
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Generate random 6-digit verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate random temp key for verification flow
 */
export function generateTempKey(): string {
  return crypto.randomBytes(32).toString('hex');
}
