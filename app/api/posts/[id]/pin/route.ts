import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { id } = params;

    // Check if user is admin or teacher
    if (session.user.role !== 'ADMIN' && session.user.role !== 'TEACHER') {
        return new NextResponse(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
    }

    try {
        const post = await prisma.boardPost.findUnique({
            where: { id },
        });

        if (!post) {
            return new NextResponse(JSON.stringify({ message: 'Post not found' }), { status: 404 });
        }

        // Toggle pin status
        const updatedPost = await prisma.boardPost.update({
            where: { id },
            data: {
                isPinned: !post.isPinned,
            },
        });

        return NextResponse.json({
            isPinned: updatedPost.isPinned,
            message: updatedPost.isPinned ? '게시글을 고정했습니다.' : '고정을 해제했습니다.'
        });
    } catch (error) {
        console.error('Error toggling pin:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
