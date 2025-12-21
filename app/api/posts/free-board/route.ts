import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BoardCategory } from '@prisma/client';

export async function GET(request: Request) {
  // Public can view - no auth required
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '15', 10);
  const search = searchParams.get('search') || '';
  const skip = (page - 1) * limit;

  try {
    // Build where clause
    const whereClause: any = {
      category: BoardCategory.FREE_BOARD,
    };

    // Add search filter if provided
    if (search.trim()) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const posts = await prisma.boardPost.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            koreanName: true,
            image: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
        reactions: {
          select: {
            userId: true,
          },
        },
      },
      orderBy: [
        { isPinned: 'desc' }, // Pinned posts first
        { createdAt: 'desc' },
      ],
      skip,
      take: limit,
    });

    const totalPosts = await prisma.boardPost.count({
      where: whereClause,
    });

    return NextResponse.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (error) {
    console.error('Error fetching free board posts:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
