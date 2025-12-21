import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { id } = params;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Prevent deleting yourself
        if (user.id === session.user.id) {
            return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
        }

        // Delete user (cascade will delete all posts, comments, etc.)
        await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
