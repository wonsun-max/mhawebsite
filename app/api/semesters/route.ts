import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAdmin } from "@/lib/rbac";

// GET /api/semesters
export async function GET() {
    try {
        const semesters = await prisma.semester.findMany({
            orderBy: { id: 'asc' }
        });
        return ApiResponse.success(semesters);
    } catch (error) {
        console.error("Error fetching semesters:", error);
        return ApiResponse.serverError("Failed to fetch semesters");
    }
}

// POST /api/semesters (Admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) {
            return ApiResponse.forbidden("Only admins can manage semesters");
        }

        const body = await request.json();
        const { id, name, startDate, endDate, image, pdf } = body;

        if (!id || !name) {
            return ApiResponse.error("ID and Name are required");
        }

        const semester = await prisma.semester.upsert({
            where: { id },
            update: {
                name,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                image,
                pdf
            },
            create: {
                id,
                name,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                image,
                pdf
            }
        });

        return ApiResponse.success(semester, "Semester saved successfully");
    } catch (error) {
        console.error("Error saving semester:", error);
        return ApiResponse.serverError("Failed to save semester");
    }
}
