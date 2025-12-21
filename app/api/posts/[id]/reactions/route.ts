import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Check if post exists
        const post = await prisma.boardPost.findUnique({
            where: { id },
        });

        if (!post) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        }

        // Check if user already reacted
        const existingReaction = await prisma.reaction.findUnique({
            where: {
                userId_postId: {
                    userId: session.user.id,
                    postId: id,
                },
            },
        });

        if (existingReaction) {
            // If exists, remove it (Unlike)
            await prisma.reaction.delete({
                where: { id: existingReaction.id },
            });
            return NextResponse.json({ success: true, liked: false });
        } else {
            // If not exists, create it (Like)
            await prisma.reaction.create({
                data: {
                    userId: session.user.id,
                    postId: id,
                    type: 'LIKE',
                },
            });
            return NextResponse.json({ success: true, liked: true });
        }

    } catch (error) {
        console.error('Error toggling reaction:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const { id } = await params;

        const [reactionCount, userReaction] = await Promise.all([
            prisma.reaction.count({
                where: { postId: id },
            }),
            session?.user?.id ? prisma.reaction.findUnique({
                where: {
                    userId_postId: {
                        userId: session.user.id,
                        postId: id,
                    },
                },
            }) : null,
        ]);

        return NextResponse.json({
            success: true,
            count: reactionCount,
            isLiked: !!userReaction,
        });

    } catch (error) {
        console.error('Error fetching reactions:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
