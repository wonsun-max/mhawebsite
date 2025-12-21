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

        // Check if comment exists
        const comment = await prisma.comment.findUnique({
            where: { id },
        });

        if (!comment) {
            return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 });
        }

        // Check if user already reacted
        const existingReaction = await prisma.reaction.findUnique({
            where: {
                userId_commentId: {
                    userId: session.user.id,
                    commentId: id,
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
                    commentId: id,
                    type: 'LIKE',
                },
            });
            return NextResponse.json({ success: true, liked: true });
        }

    } catch (error) {
        console.error('Error toggling comment reaction:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
