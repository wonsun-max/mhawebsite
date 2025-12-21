import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/api-response";
import { isAuthenticated } from "@/lib/rbac";
import { uploadToSupabase } from "@/lib/supabase-upload";
import { MediaType } from "@prisma/client";

// POST /api/upload - Upload files
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!isAuthenticated(session)) {
      return ApiResponse.unauthorized("You must be logged in to upload files");
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const postId = formData.get("postId") as string | null;

    if (!files || files.length === 0) {
      return ApiResponse.error("No files provided");
    }

    const uploadedFiles = [];

    for (const file of files) {
      // Upload to Supabase Storage
      const fileUrl = await uploadToSupabase(file, 'posts');

      // Determine media type
      let mediaType: MediaType = MediaType.DOCUMENT;
      if (file.type.startsWith("image/")) {
        mediaType = MediaType.IMAGE;
      } else if (file.type.startsWith("video/")) {
        mediaType = MediaType.VIDEO;
      }

      // Create database record
      const mediaFile = await prisma.mediaFile.create({
        data: {
          filename: file.name,
          originalName: file.name,
          fileUrl,
          fileSize: file.size,
          mimeType: file.type,
          mediaType,
          postId: postId || undefined,
        },
      });

      uploadedFiles.push(mediaFile);
    }

    return ApiResponse.success({ files: uploadedFiles }, 201);
  } catch (error) {
    console.error("Error uploading files:", error);
    return ApiResponse.serverError("Failed to upload files");
  }
}

// GET /api/upload - Get uploaded files
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    const where: any = {};
    if (postId) {
      where.postId = postId;
    }

    const files = await prisma.mediaFile.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return ApiResponse.success({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    return ApiResponse.serverError("Failed to fetch files");
  }
}
