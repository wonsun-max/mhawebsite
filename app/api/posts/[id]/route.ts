import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { canModifyContent } from "@/lib/rbac";

export const dynamic = "force-dynamic";

// GET /api/posts/[id] - Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const post = await prisma.boardPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            koreanName: true,
            image: true,
            role: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                koreanName: true,
                image: true,
              },
            },
            _count: {
              select: { reactions: true },
            },
            reactions: userId ? {
              where: { userId },
              select: { id: true },
            } : false,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        media: true,
        _count: {
          select: { reactions: true },
        },
        reactions: userId ? {
          where: { userId },
          select: { id: true },
        } : false,
      },
    });

    if (!post) {
      return ApiResponse.notFound("Post not found");
    }

    // Increment view count
    await prisma.boardPost.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    // Transform data to include easy-to-use like fields
    const formattedPost = {
      ...post,
      likeCount: post._count.reactions,
      isLiked: post.reactions ? post.reactions.length > 0 : false,
      comments: post.comments.map(comment => ({
        ...comment,
        likeCount: comment._count.reactions,
        isLiked: comment.reactions ? comment.reactions.length > 0 : false,
        // Remove raw reaction data to clean up response
        reactions: undefined,
        _count: undefined,
      })),
      // Remove raw reaction data
      reactions: undefined,
      _count: undefined,
    };

    return ApiResponse.success(formattedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    return ApiResponse.serverError("Failed to fetch post");
  }
}

// PUT /api/posts/[id] - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return ApiResponse.unauthorized("You must be logged in to update a post");
    }

    const post = await prisma.boardPost.findUnique({
      where: { id },
    });

    if (!post) {
      return ApiResponse.notFound("Post not found");
    }

    if (!canModifyContent(session, post.authorId)) {
      return ApiResponse.forbidden("You don't have permission to edit this post");
    }

    const body = await request.json();
    const { title, content, isPinned } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    // Only admins can pin/unpin posts
    if (isPinned !== undefined && session.user.role === "ADMIN") {
      updateData.isPinned = isPinned;
    }

    const updatedPost = await prisma.boardPost.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            koreanName: true,
            image: true,
            role: true,
          },
        },
        comments: {
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
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return ApiResponse.success(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return ApiResponse.serverError("Failed to update post");
  }
}

// DELETE /api/posts/[id] - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return ApiResponse.unauthorized("You must be logged in to delete a post");
    }

    const post = await prisma.boardPost.findUnique({
      where: { id },
    });

    if (!post) {
      return ApiResponse.notFound("Post not found");
    }

    if (!canModifyContent(session, post.authorId)) {
      return ApiResponse.forbidden("You don't have permission to delete this post");
    }

    await prisma.boardPost.delete({
      where: { id },
    });

    return ApiResponse.success({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return ApiResponse.serverError("Failed to delete post");
  }
}
