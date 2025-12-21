import { ApiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/jwt";
import { cookies } from "next/headers";

// POST /api/auth/logout - Logout and invalidate refresh token
export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (refreshToken) {
      // Delete refresh token from database
      const tokenHash = hashToken(refreshToken);
      await prisma.refreshToken.deleteMany({
        where: { tokenHash },
      });

      // Clear cookie
      cookieStore.delete('refreshToken');
    }

    return ApiResponse.success({ message: "로그아웃되었습니다" });
  } catch (error) {
    console.error("Error logging out:", error);
    return ApiResponse.serverError("로그아웃 중 오류가 발생했습니다");
  }
}
