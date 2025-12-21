import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendApprovalEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

// PATCH /api/admin/users/[id]/approve - Approve/reject user or change role (Admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "관리자만 접근할 수 있습니다" }, { status: 403 });
    }

    const body = await request.json();
    const { status, role, reason } = body;

    // Validate status
    const validStatuses = ['ACTIVE', 'SUSPENDED', 'INACTIVE'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "유효하지 않은 상태입니다" }, { status: 400 });
    }

    // Validate role if provided
    const validRoles = ['STUDENT', 'TEACHER', 'ADMIN', 'PARENT', 'GUEST'];
    if (role && !validRoles.includes(role)) {
      return NextResponse.json({ error: "유효하지 않은 역할입니다" }, { status: 400 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다" }, { status: 404 });
    }

    // Update user
    const updateData: any = {};
    if (status) {
      updateData.status = status;
      if (status === 'ACTIVE' && user.status === 'PENDING') {
        updateData.approvedAt = new Date();
      }
    }
    if (role) {
      updateData.role = role;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Create audit log
    let auditAction: 'APPROVE_USER' | 'SUSPEND_USER' | 'ROLE_CHANGE' | 'UPDATE' = 'UPDATE';
    if (status === 'ACTIVE' && user.status === 'PENDING') {
      auditAction = 'APPROVE_USER';
    } else if (status === 'SUSPENDED') {
      auditAction = 'SUSPEND_USER';
    } else if (role && role !== user.role) {
      auditAction = 'ROLE_CHANGE';
    }

    await prisma.auditLog.create({
      data: {
        action: auditAction,
        actorId: session.user.id,
        targetId: user.id,
        metadata: {
          oldStatus: user.status,
          newStatus: status,
          oldRole: user.role,
          newRole: role,
          reason,
        },
      },
    });

    // Send email notification
    if (status && user.status === 'PENDING' && status === 'ACTIVE') {
      await sendApprovalEmail(user.email, user.username || '', true);
    } else if (status === 'SUSPENDED') {
      await sendApprovalEmail(user.email, user.username || '', false);
    }

    return NextResponse.json({
      success: true,
      data: {
        message: "사용자 정보가 업데이트되었습니다",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,
          status: updatedUser.status,
        },
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "사용자 정보 업데이트 중 오류가 발생했습니다" }, { status: 500 });
  }
}
