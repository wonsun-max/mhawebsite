import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAdmin } from "@/lib/rbac";

// GET /api/missionaries/[id] - Get single missionary
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const missionary = await prisma.mKMissionary.findUnique({
      where: { id },
    });

    if (!missionary) {
      return ApiResponse.notFound("Missionary not found");
    }

    return ApiResponse.success(missionary);
  } catch (error) {
    console.error("Error fetching missionary:", error);
    return ApiResponse.serverError("Failed to fetch missionary");
  }
}

// PUT /api/missionaries/[id] - Update missionary (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!isAdmin(session)) {
      return ApiResponse.forbidden("Only admins can update missionary profiles");
    }

    const missionary = await prisma.mKMissionary.findUnique({
      where: { id },
    });

    if (!missionary) {
      return ApiResponse.notFound("Missionary not found");
    }

    const body = await request.json();
    const { order: newOrder } = body;
    const oldOrder = missionary.order;

    // If order is changed, shift other items
    if (typeof newOrder === 'number' && newOrder !== oldOrder) {
      if (newOrder < oldOrder) {
        // Moving up (e.g., 5 -> 2): Shift 2, 3, 4 down to 3, 4, 5
        await prisma.mKMissionary.updateMany({
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
        // Moving down (e.g., 2 -> 5): Shift 3, 4, 5 up to 2, 3, 4
        await prisma.mKMissionary.updateMany({
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

    const updatedMissionary = await prisma.mKMissionary.update({
      where: { id },
      data: body,
    });

    return ApiResponse.success(updatedMissionary);
  } catch (error) {
    console.error("Error updating missionary:", error);
    return ApiResponse.serverError("Failed to update missionary");
  }
}

// DELETE /api/missionaries/[id] - Delete missionary (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!isAdmin(session)) {
      return ApiResponse.forbidden("Only admins can delete missionary profiles");
    }

    const missionary = await prisma.mKMissionary.findUnique({
      where: { id },
    });

    if (!missionary) {
      return ApiResponse.notFound("Missionary not found");
    }

    // Shift orders of subsequent items
    await prisma.mKMissionary.updateMany({
      where: {
        order: {
          gt: missionary.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    await prisma.mKMissionary.delete({
      where: { id },
    });

    return ApiResponse.success({ message: "Missionary deleted successfully" });
  } catch (error) {
    console.error("Error deleting missionary:", error);
    return ApiResponse.serverError("Failed to delete missionary");
  }
}
