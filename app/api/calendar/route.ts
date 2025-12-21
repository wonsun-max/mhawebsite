import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAdmin } from "@/lib/rbac";

// GET /api/calendar?start=2025-01-01&end=2025-12-31&semester=s1&category=holiday
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const startParam = searchParams.get("start");
        const endParam = searchParams.get("end");
        const limit = searchParams.get("limit");
        const semesterId = searchParams.get("semester");
        const category = searchParams.get("category");

        const where: any = {};

        // Filter by date range
        if (startParam && endParam) {
            where.date = {
                gte: new Date(startParam),
                lte: new Date(endParam),
            };
        } else if (startParam) {
            // Open-ended start (for upcoming events)
            where.date = {
                gte: new Date(startParam),
            };
        }

        // Filter by semester
        if (semesterId) {
            where.semesterId = semesterId;
        }

        // Filter by category
        if (category) {
            where.category = category;
        }

        const events = await prisma.calendarEvent.findMany({
            where,
            include: {
                semester: true // Include semester details if needed
            },
            orderBy: [
                { date: "asc" },
                { order: "asc" },
            ],
            take: limit ? parseInt(limit) : undefined,
        });

        return ApiResponse.success(events);
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        return ApiResponse.serverError("Failed to fetch calendar events");
    }
}

// POST /api/calendar - Bulk create/update events (Admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!isAdmin(session)) {
            return ApiResponse.forbidden("Only admins can create calendar events");
        }

        const body = await request.json();
        const { events } = body; // Array of { title, description, date, ... }

        if (!Array.isArray(events)) {
            return ApiResponse.error("Invalid data format");
        }

        const upsertPromises = events.map((event) => {
            const eventDate = new Date(event.date);

            return prisma.calendarEvent.create({
                data: {
                    title: event.title,
                    description: event.description || null,
                    date: eventDate,
                    endDate: event.endDate ? new Date(event.endDate) : null,
                    category: event.category || "event",
                    semesterId: event.semester || null, // Map 'semester' from frontend to 'semesterId'
                    isAllDay: event.isAllDay !== undefined ? event.isAllDay : true,
                    color: event.color || null,
                    order: event.order || 0,
                },
            });
        });

        const results = await prisma.$transaction(upsertPromises);

        return ApiResponse.success(
            { count: results.length, events: results },
            "Calendar events created successfully"
        );
    } catch (error) {
        console.error("Error creating calendar events:", error);
        return ApiResponse.serverError("Failed to create calendar events");
    }
}
