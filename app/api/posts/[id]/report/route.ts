import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ReportReason } from '@prisma/client';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { reason, details } = body;

    if (!Object.values(ReportReason).includes(reason)) {
        return new NextResponse(JSON.stringify({ message: 'Invalid report reason' }), { status: 400 });
    }

    try {
        const report = await prisma.postReport.create({
            data: {
                postId: id,
                reporterId: session.user.id,
                reason: reason as ReportReason,
                details: details || null,
                status: 'PENDING',
            },
        });

        // TODO: Notify admins/teachers about the report

        return NextResponse.json({
            message: '신고가 접수되었습니다. 관리자가 검토할 예정입니다.',
            reportId: report.id
        });
    } catch (error: any) {
        console.error('Error creating report:', error);

        // Check if user already reported this post
        if (error.code === 'P2002') {
            return new NextResponse(
                JSON.stringify({ message: '이미 신고한 게시글입니다.' }),
                { status: 400 }
            );
        }

        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
