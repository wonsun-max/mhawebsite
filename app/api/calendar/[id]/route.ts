import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAdmin } from "@/lib/rbac";

export const dynamic = "force-dynamic";

// GET /api/calendar/[id] - Get single event
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const event = await prisma.calendarEvent.findUnique({
            where: { id },
        });

        if (!event) {
            return ApiResponse.notFound("Event not found");
        }

        return ApiResponse.success(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        return ApiResponse.serverError("Failed to fetch event");
    }
}

// PUT /api/calendar/[id] - Update event (Admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const session = await getServerSession(authOptions);

        if (!isAdmin(session)) {
            return ApiResponse.forbidden("Only admins can update calendar events");
        }

        const event = await prisma.calendarEvent.findUnique({
            where: { id },
        });

        if (!event) {
            return ApiResponse.notFound("Event not found");
        }

        const body = await request.json();
        const { semester, date, endDate, ...rest } = body;

        // Map 'semester' from frontend to 'semesterId' for DB
        const updateData: any = {
            ...rest,
            semesterId: semester || null,
        };

        // Convert dates if provided
        if (date) {
            updateData.date = new Date(date);
        }
        if (endDate) {
            updateData.endDate = new Date(endDate);
        }

        const { order: newOrder } = body;
        const oldOrder = event.order;

        // If order is changed, shift other items
        if (typeof newOrder === 'number' && newOrder !== oldOrder) {
            if (newOrder < oldOrder) {
                // Moving up: Shift items down
                await prisma.calendarEvent.updateMany({
                    where: {
                        order: {
                            gte: newOrder,
                            lt: oldOrder,
                        },
                    },
                    data: {
                        order: {
                            increment: 1,
                        },
                    },
                });
            } else {
                // Moving down: Shift items up
                await prisma.calendarEvent.updateMany({
                    where: {
                        order: {
                            gt: oldOrder,
                            lte: newOrder,
                        },
                    },
                    data: {
                        order: {
                            decrement: 1,
                        },
                    },
                });
            }
        }

        const updatedEvent = await prisma.calendarEvent.update({
            where: { id },
            data: updateData,
        });

        return ApiResponse.success(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        return ApiResponse.serverError("Failed to update event");
    }
}

// DELETE /api/calendar/[id] - Delete event (Admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const session = await getServerSession(authOptions);

        if (!isAdmin(session)) {
            return ApiResponse.forbidden("Only admins can delete calendar events");
        }

        const event = await prisma.calendarEvent.findUnique({
            where: { id },
        });

        if (!event) {
            return ApiResponse.notFound("Event not found");
        }

        // Shift orders of subsequent items
        await prisma.calendarEvent.updateMany({
            where: {
                order: {
                    gt: event.order,
                },
            },
            data: {
                order: {
                    decrement: 1,
                },
            },
        });

        await prisma.calendarEvent.delete({
            where: { id },
        });

        return ApiResponse.success({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        return ApiResponse.serverError("Failed to delete event");
    }
}
