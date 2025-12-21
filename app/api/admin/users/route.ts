import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET /api/admin/users - Get all users (Admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "관리자만 접근할 수 있습니다" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const role = searchParams.get("role");

    const where: any = {};
    if (status && status !== "all") where.status = status;
    if (role && role !== "all") where.role = role;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        koreanName: true,
        role: true,
        status: true,
        grade: true,
        studentName: true,
        gender: true,
        age: true,
        birthdate: true,
        emailVerified: true,
        createdAt: true,
        lastLoginAt: true,
        approvedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "사용자 목록 조회 중 오류가 발생했습니다" }, { status: 500 });
  }
}
