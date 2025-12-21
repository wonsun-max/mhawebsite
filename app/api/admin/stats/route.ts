import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BoardCategory } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
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

        // 1. Fetch Counts
        const [
            announcementCount,
            albumCount,
            missionaryCount,
            mealPlanCount
        ] = await Promise.all([
            prisma.boardPost.count({
                where: { category: BoardCategory.ANNOUNCEMENT }
            }),
            prisma.album.count(),
            prisma.mKMissionary.count(),
            prisma.mealPlan.count() // This counts days with meal plans
        ]);

        // 2. Fetch Recent Activity (Combine Posts and Albums)
        const [recentPosts, recentAlbums] = await Promise.all([
            prisma.boardPost.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    author: {
                        select: { name: true, koreanName: true }
                    }
                }
            }),
            prisma.album.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    author: {
                        select: { name: true, koreanName: true }
                    }
                }
            })
        ]);

        // Combine and sort recent activity
        const combinedActivity = [
            ...recentPosts.map(post => ({
                id: post.id,
                type: post.category === BoardCategory.ANNOUNCEMENT ? 'ANNOUNCEMENT' : 'POST',
                title: post.title,
                createdAt: post.createdAt,
                author: post.author.koreanName || post.author.name
            })),
            ...recentAlbums.map(album => ({
                id: album.id,
                type: 'ALBUM',
                title: album.title,
                createdAt: album.createdAt,
                author: album.author.koreanName || album.author.name
            }))
        ]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);

        return NextResponse.json({
            success: true,
            data: {
                counts: {
                    announcements: announcementCount,
                    albums: albumCount,
                    missionaries: missionaryCount,
                    meals: mealPlanCount
                },
                recentActivity: combinedActivity
            }
        });

    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
