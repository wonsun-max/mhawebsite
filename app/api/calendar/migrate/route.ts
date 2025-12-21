import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAdmin } from "@/lib/rbac";

// POST /api/calendar/migrate - Migration endpoint (Admin only)
// Note: This endpoint is kept for compatibility but data should already be in DB
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!isAdmin(session)) {
            return ApiResponse.forbidden("Only admins can run migrations");
        }

        // Check existing data
        const semesterCount = await prisma.semester.count();
        const eventCount = await prisma.calendarEvent.count();

        return ApiResponse.success(
            {
                semesterCount,
                eventCount,
                message: `Database already contains ${semesterCount} semesters and ${eventCount} events. Use the admin panel to manage data.`
            }
        );
    } catch (error) {
        console.error("Error checking database:", error);
        return ApiResponse.serverError("Failed to check database");
    }
}
