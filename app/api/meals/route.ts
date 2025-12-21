import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, parseISO } from "date-fns";

// GET /api/meals?start=2024-01-01&end=2024-01-31
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");
    const view = searchParams.get("view") || "month"; // 'month' or 'week'

    let startDate: Date;
    let endDate: Date;

    if (startParam && endParam) {
      startDate = new Date(startParam);
      endDate = new Date(endParam);
    } else {
      // Default to current month
      const now = new Date();
      if (view === "week") {
        startDate = startOfWeek(now, { weekStartsOn: 0 }); // Sunday
        endDate = endOfWeek(now, { weekStartsOn: 0 });
      } else {
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
      }
    }

    const meals = await prisma.mealPlan.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return ApiResponse.success(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    return ApiResponse.serverError("급식 정보를 불러오는 중 오류가 발생했습니다.");
  }
}

// POST /api/meals - Bulk update/create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meals } = body; // Array of { date: string, lunch: string }

    if (!Array.isArray(meals)) {
      return ApiResponse.error("잘못된 데이터 형식입니다.");
    }

    const upsertPromises = meals.map((meal) => {
      const date = new Date(meal.date);
      return prisma.mealPlan.upsert({
        where: {
          date: date,
        },
        update: {
          lunch: meal.lunch,
        },
        create: {
          date: date,
          lunch: meal.lunch,
        },
      });
    });

    await prisma.$transaction(upsertPromises);

    return ApiResponse.success({ count: meals.length }, "급식 정보가 저장되었습니다.");
  } catch (error) {
    console.error("Error saving meals:", error);
    return ApiResponse.serverError("급식 정보를 저장하는 중 오류가 발생했습니다.");
  }
}
