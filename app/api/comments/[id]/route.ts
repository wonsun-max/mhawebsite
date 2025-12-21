import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { canModifyContent } from "@/lib/rbac";

export const dynamic = "force-dynamic";

// PUT /api/comments/[id] - Update comment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return ApiResponse.unauthorized("You must be logged in to update a comment");
    }

    const { id } = params;
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return ApiResponse.notFound("Comment not found");
    }

    if (!canModifyContent(session, comment.authorId)) {
      return ApiResponse.forbidden("You don't have permission to edit this comment");
    }

    const body = await request.json();
    const { text } = body;

    if (!text) {
      return ApiResponse.error("Text is required");
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { text },
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

    return ApiResponse.success(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return ApiResponse.serverError("Failed to update comment");
  }
}

// DELETE /api/comments/[id] - Delete comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return ApiResponse.unauthorized("You must be logged in to delete a comment");
    }

    const { id } = params;
    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return ApiResponse.notFound("Comment not found");
    }

    if (!canModifyContent(session, comment.authorId)) {
      return ApiResponse.forbidden("You don't have permission to delete this comment");
    }

    await prisma.comment.delete({
      where: { id },
    });

    return ApiResponse.success({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return ApiResponse.serverError("Failed to delete comment");
  }
}
