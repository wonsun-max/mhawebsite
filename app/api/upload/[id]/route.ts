import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAdmin } from "@/lib/rbac";
import { unlink } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

// DELETE /api/upload/[id] - Delete file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!isAdmin(session)) {
      return ApiResponse.forbidden("Only admins can delete files");
    }

    const file = await prisma.mediaFile.findUnique({
      where: { id },
    });

    if (!file) {
      return ApiResponse.notFound("File not found");
    }

    // Delete file from disk
    try {
      const filepath = path.join(process.cwd(), "public", "uploads", file.filename);
      await unlink(filepath);
    } catch (error) {
      console.error("Error deleting file from disk:", error);
      // Continue even if file deletion fails
    }

    // Delete database record
    await prisma.mediaFile.delete({
      where: { id },
    });

    return ApiResponse.success({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return ApiResponse.serverError("Failed to delete file");
  }
}
