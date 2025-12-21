import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BoardCategory } from '@prisma/client';

export const dynamic = 'force-dynamic';

// GET: Fetch all announcements
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';
        const type = searchParams.get('type'); // 'pinned' | 'general' | undefined (all)

        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = {
            category: BoardCategory.ANNOUNCEMENT
        };

        // Filter by type (Pinned vs General)
        if (type === 'pinned') {
            where.isPinned = true;
        } else if (type === 'general') {
            where.isPinned = false;
        }

        // Search filter
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } }
            ];
        }

        const [announcements, total] = await Promise.all([
            prisma.boardPost.findMany({
                where,
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            koreanName: true,
                        }
                    }
                },
                orderBy: [
                    { isPinned: 'desc' }, // Keep pinned on top if showing all
                    { createdAt: 'desc' }
                ],
                skip: type === 'pinned' ? 0 : skip, // No pagination for pinned list usually
                take: type === 'pinned' ? undefined : limit // Fetch all pinned if requested
            }),
            prisma.boardPost.count({ where })
        ]);

        return NextResponse.json({
            success: true,
            data: announcements,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch announcements' },
            { status: 500 }
        );
    }
}

// POST: Create new announcement (Admin only)
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if user is admin
        if (session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, error: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { title, content, isPinned } = body;

        if (!title || !title.trim()) {
            return NextResponse.json(
                { success: false, error: 'Title is required' },
                { status: 400 }
            );
        }

        if (!content || !content.trim()) {
            return NextResponse.json(
                { success: false, error: 'Content is required' },
                { status: 400 }
            );
        }

        // Get user ID from email
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        // Create announcement
        const announcement = await prisma.boardPost.create({
            data: {
                title: title.trim(),
                content: content.trim(),
                category: BoardCategory.ANNOUNCEMENT,
                isPinned: isPinned || false,
                authorId: user.id
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

        return NextResponse.json({
            success: true,
            data: announcement
        });

    } catch (error) {
        console.error('Error creating announcement:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create announcement' },
            { status: 500 }
        );
    }
}
