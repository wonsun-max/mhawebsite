import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BoardCategory } from '@prisma/client';

export const dynamic = 'force-dynamic';

// GET single announcement
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    if (!id) return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });

    try {
        const announcement = await prisma.boardPost.findUnique({
            where: {
                id: id,
                category: BoardCategory.ANNOUNCEMENT
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        koreanName: true,
                    }
                }
            },
        });

        if (!announcement) {
            return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: announcement });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

// PUT update announcement (admin only)
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
        return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const id = params.id;
    const { title, content, isPinned } = await request.json();

    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

    try {
        const updated = await prisma.boardPost.update({
            where: {
                id: id,
                category: BoardCategory.ANNOUNCEMENT
            },
            data: {
                title,
                content,
                isPinned
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        koreanName: true,
                    }
                }
            }
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
    }
}

// DELETE announcement (admin only)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== 'ADMIN') {
        return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const id = params.id;
    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

    try {
        await prisma.boardPost.delete({
            where: {
                id: id,
                category: BoardCategory.ANNOUNCEMENT
            }
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
    }
}
