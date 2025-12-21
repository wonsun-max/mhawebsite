import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAdmin } from "@/lib/rbac";

// GET /api/missionaries - Get all missionaries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";

    const where: any = {};
    if (activeOnly) {
      where.isActive = true;
    }

    const missionaries = await prisma.mKMissionary.findMany({
      where,
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });

    return ApiResponse.success({ missionaries });
  } catch (error) {
    console.error("Error fetching missionaries:", error);
    return ApiResponse.serverError("Failed to fetch missionaries");
  }
}

// POST /api/missionaries - Create new missionary (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!isAdmin(session)) {
      return ApiResponse.forbidden("Only admins can create missionary profiles");
    }

    const body = await request.json();
    const {
      name,
      koreanName,
      role,
      description,
      imageUrl,
      email,
      phone,
      isActive,
      order,
    } = body;

    if (!name || !role || !description) {
      return ApiResponse.error("Name, role, and description are required");
    }

    // If a specific order is requested, shift existing items down
    if (typeof order === 'number') {
      await prisma.mKMissionary.updateMany({
        where: {
          order: {
            gte: order,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    const missionary = await prisma.mKMissionary.create({
      data: {
        name,
        koreanName,
        role,
        description,
        imageUrl,
        email,
        phone,
        isActive: isActive ?? true,
        order: order ?? 0,
      },
    });

    return ApiResponse.success(missionary, 201);
  } catch (error) {
    console.error("Error creating missionary:", error);
    return ApiResponse.serverError("Failed to create missionary");
  }
}
