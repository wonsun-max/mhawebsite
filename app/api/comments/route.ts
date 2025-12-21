import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAuthenticated } from "@/lib/rbac";

// POST /api/comments - Create new comment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!isAuthenticated(session)) {
      return ApiResponse.unauthorized("You must be logged in to comment");
    }

    const body = await request.json();
    const { text, postId } = body;

    if (!text || !postId) {
      return ApiResponse.error("Text and postId are required");
    }

    // Check if post exists
    const post = await prisma.boardPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return ApiResponse.notFound("Post not found");
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        authorId: session!.user!.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            koreanName: true,
            image: true,
          },
        },
      },
    });

    return ApiResponse.success(comment, 201);
  } catch (error) {
    console.error("Error creating comment:", error);
    return ApiResponse.serverError("Failed to create comment");
  }
}
