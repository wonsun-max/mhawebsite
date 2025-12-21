import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/jwt";
import { UserRole } from "@prisma/client"; // Import UserRole enum

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized("인증 토큰이 없습니다");
    }

    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);

    if (!payload || !payload.userId) {
      return ApiResponse.unauthorized("유효하지 않은 토큰입니다");
    }

    const body = await request.json();
    const {
      koreanName,
      birthdate,
      gender,
      role,
      grade,
      studentName,
      nickname, // Add nickname here
    } = body;

    // Basic validation
    if (!koreanName || !birthdate || !gender || !role) {
      return ApiResponse.error("필수 정보를 모두 입력해주세요");
    }

    // Validate role against UserRole enum
    const validRoles: UserRole[] = ['STUDENT', 'TEACHER', 'PARENT', 'GUEST'];
    if (!validRoles.includes(role)) {
      return ApiResponse.error("유효하지 않은 역할입니다");
    }

    // Role-specific validation
    if (role === 'STUDENT' && (!grade || isNaN(parseInt(grade)))) {
      return ApiResponse.error("학생은 학년 정보가 필요합니다");
    }
    if (role === 'PARENT' && !studentName) {
      return ApiResponse.error("학부모는 학생 이름이 필요합니다");
    }

    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: {
        koreanName,
        birthdate: new Date(birthdate),
        gender,
        role,
        grade: role === 'STUDENT' ? parseInt(grade) : null,
        studentName: role === 'PARENT' ? studentName : null,
        nickname: nickname || null, // Include nickname here
        // Set status to ACTIVE if it was PENDING and now onboarding is complete
        status: 'ACTIVE', // Assuming onboarding completes activation
        approvedAt: new Date(), // Mark as approved upon onboarding completion
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        koreanName: true,
        role: true,
        status: true,
        image: true,
        grade: true,
        studentName: true,
        gender: true,
        birthdate: true,
      },
    });

    return ApiResponse.success({
      message: "프로필이 성공적으로 업데이트되었습니다",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error onboarding user:", error);
    return ApiResponse.serverError("프로필 업데이트 중 오류가 발생했습니다");
  }
}
