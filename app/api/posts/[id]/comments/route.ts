import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';


export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const { id } = await params;

  try {
    const { text } = await request.json();

    if (!text || text.trim() === '') {
      return new NextResponse(JSON.stringify({ message: 'Comment text cannot be empty.' }), { status: 400 });
    }

    // Check if the post exists
    const existingPost = await prisma.boardPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return new NextResponse(JSON.stringify({ message: 'Post not found.' }), { status: 404 });
    }

    const newComment = await prisma.comment.create({
      data: {
        text,
        postId: id,
        authorId: session.user.id,
      },
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
    });

    return NextResponse.json({ success: true, data: newComment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
