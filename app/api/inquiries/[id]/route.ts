import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PATCH /api/inquiries/[id] - Update inquiry status
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return ApiResponse.forbidden("관리자 권한이 필요합니다.");
        }

        const { id } = params;
        const body = await request.json();
        const { status } = body;

        const inquiry = await prisma.inquiry.update({
            where: { id },
            data: { status },
        });

        return ApiResponse.success(inquiry, "문의 상태가 변경되었습니다.");
    } catch (error) {
        console.error("Error updating inquiry:", error);
        return ApiResponse.serverError("문의 상태 변경 중 오류가 발생했습니다.");
    }
}
