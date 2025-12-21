import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET /api/auth/me - Get current user info
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized("인증 토큰이 없습니다");
    }

    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);

    if (!payload) {
      return ApiResponse.unauthorized("유효하지 않은 토큰입니다");
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        koreanName: true,
        image: true,
        birthdate: true,
        gender: true,
        age: true,
        grade: true,
        studentName: true,
        role: true,
        status: true,
        emailVerified: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!user) {
      return ApiResponse.notFound("사용자를 찾을 수 없습니다");
    }

    if (user.status !== 'ACTIVE') {
      return ApiResponse.forbidden("계정이 활성화되지 않았습니다");
    }

    return ApiResponse.success(user);
  } catch (error) {
    console.error("Error getting current user:", error);
    return ApiResponse.serverError("사용자 정보 조회 중 오류가 발생했습니다");
  }
}
