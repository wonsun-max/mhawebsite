import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAdmin } from "@/lib/rbac";

// GET /api/meals/[id] - Get single meal plan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const meal = await prisma.mealPlan.findUnique({
      where: { id },
    });

    if (!meal) {
      return ApiResponse.notFound("Meal plan not found");
    }

    return ApiResponse.success(meal);
  } catch (error) {
    console.error("Error fetching meal plan:", error);
    return ApiResponse.serverError("Failed to fetch meal plan");
  }
}

// PUT /api/meals/[id] - Update meal plan (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!isAdmin(session)) {
      return ApiResponse.forbidden("Only admins can update meal plans");
    }

    const { id } = await params;
    const meal = await prisma.mealPlan.findUnique({
      where: { id },
    });

    if (!meal) {
      return ApiResponse.notFound("Meal plan not found");
    }

    const body = await request.json();
    const { breakfast, lunch, dinner, snack } = body;

    const updatedMeal = await prisma.mealPlan.update({
      where: { id },
      data: {
        breakfast,
        lunch,
        dinner,
        snack,
      },
    });

    return ApiResponse.success(updatedMeal);
  } catch (error) {
    console.error("Error updating meal plan:", error);
    return ApiResponse.serverError("Failed to update meal plan");
  }
}

// DELETE /api/meals/[id] - Delete meal plan (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!isAdmin(session)) {
      return ApiResponse.forbidden("Only admins can delete meal plans");
    }

    const { id } = await params;
    const meal = await prisma.mealPlan.findUnique({
      where: { id },
    });

    if (!meal) {
      return ApiResponse.notFound("Meal plan not found");
    }

    await prisma.mealPlan.delete({
      where: { id },
    });

    return ApiResponse.success({ message: "Meal plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal plan:", error);
    return ApiResponse.serverError("Failed to delete meal plan");
  }
}
