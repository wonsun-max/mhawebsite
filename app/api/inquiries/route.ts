import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST /api/inquiries - Submit a new inquiry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, kakaoId, message, category } = body;

        if (!name || !email || !message) {
            return ApiResponse.error("필수 항목을 모두 입력해주세요.");
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                name,
                email,
                phone,
                kakaoId,
                message,
                category: category || "GENERAL", // Default to GENERAL if not provided
            },
        });

        return ApiResponse.success(inquiry, "문의가 성공적으로 접수되었습니다.");
    } catch (error) {
        console.error("Error creating inquiry:", error);
        return ApiResponse.serverError("문의 접수 중 오류가 발생했습니다.");
    }
}

// GET /api/inquiries - List inquiries (Admin only)
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return ApiResponse.forbidden("관리자 권한이 필요합니다.");
        }

        const inquiries = await prisma.inquiry.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return ApiResponse.success(inquiries);
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return ApiResponse.serverError("문의 목록을 불러오는 중 오류가 발생했습니다.");
    }
}
