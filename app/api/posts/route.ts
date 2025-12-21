import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BoardCategory } from '@prisma/client';
import { canWriteBoard } from '@/lib/rbac';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as BoardCategory | null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where = category ? { category } : {};

    const [posts, total] = await Promise.all([
      prisma.boardPost.findMany({
        where,
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
            select: {
              comments: true,
              reactions: true,
            },
          },
        },
        orderBy: [
          { isPinned: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.boardPost.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  // Check if the user has permission to write to the board
  if (!canWriteBoard(session)) {
    return new NextResponse(JSON.stringify({ message: 'Forbidden: You do not have permission to write posts.' }), { status: 403 });
  }

  try {
    const { title, content, category, isAnonymous, anonymousNickname } = await request.json();

    if (!title || !content) {
      return new NextResponse(JSON.stringify({ message: 'Title and content are required.' }), { status: 400 });
    }

    // Ensure the category is explicitly FREE_BOARD for this endpoint
    if (category !== BoardCategory.FREE_BOARD) {
      return new NextResponse(JSON.stringify({ message: 'Invalid category for this endpoint.' }), { status: 400 });
    }

    if (isAnonymous && (!anonymousNickname || anonymousNickname.trim() === '')) {
      return new NextResponse(JSON.stringify({ message: 'Anonymous nickname is required for anonymous posts.' }), { status: 400 });
    }

    const newPost = await prisma.boardPost.create({
      data: {
        title,
        content,
        category: BoardCategory.FREE_BOARD,
        authorId: session.user.id,
        anonymousNickname: isAnonymous ? anonymousNickname.trim() : null,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}