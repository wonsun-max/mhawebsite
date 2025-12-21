import { ApiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { verifyRefreshToken, generateAccessToken, hashToken } from "@/lib/jwt";
import { cookies } from "next/headers";

// POST /api/auth/refresh - Refresh access token
export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return ApiResponse.unauthorized("Refresh token이 없습니다");
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return ApiResponse.unauthorized("유효하지 않은 refresh token입니다");
    }

    // Check if token exists in database
    const tokenHash = hashToken(refreshToken);
    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken) {
      return ApiResponse.unauthorized("Refresh token을 찾을 수 없습니다");
    }

    // Check if expired
    if (new Date() > storedToken.expiresAt) {
      await prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });
      return ApiResponse.unauthorized("Refresh token이 만료되었습니다");
    }

    // Check user status
    if (storedToken.user.status !== 'ACTIVE') {
      return ApiResponse.forbidden("계정이 활성화되지 않았습니다");
    }

    // Generate new access token
    const newPayload = {
      userId: storedToken.user.id,
      username: storedToken.user.username!,
      email: storedToken.user.email,
      role: storedToken.user.role,
      status: storedToken.user.status,
    };

    const accessToken = generateAccessToken(newPayload);

    return ApiResponse.success({
      accessToken,
      user: {
        id: storedToken.user.id,
        username: storedToken.user.username,
        email: storedToken.user.email,
        name: storedToken.user.name,
        koreanName: storedToken.user.koreanName,
        role: storedToken.user.role,
        status: storedToken.user.status,
      },
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return ApiResponse.serverError("토큰 갱신 중 오류가 발생했습니다");
  }
}
