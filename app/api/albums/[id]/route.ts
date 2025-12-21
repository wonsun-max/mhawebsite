import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { unlink } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

// GET: Fetch single album
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const album = await prisma.album.findUnique({
            where: { id: params.id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        koreanName: true,
                        image: true,
                    }
                }
            }
        });

        if (!album) {
            return NextResponse.json(
                { success: false, error: 'Album not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: album
        });
    } catch (error) {
        console.error('Error fetching album:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch album' },
            { status: 500 }
        );
    }
}

// PUT: Update album
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
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
        const { title, description, images } = body;

        if (!title || !title.trim()) {
            return NextResponse.json(
                { success: false, error: 'Title is required' },
                { status: 400 }
            );
        }

        if (!images || !Array.isArray(images) || images.length === 0) {
            return NextResponse.json(
                { success: false, error: 'At least one image is required' },
                { status: 400 }
            );
        }

        // Update album
        const album = await prisma.album.update({
            where: { id: params.id },
            data: {
                title: title.trim(),
                description: description?.trim() || null,
                images: images,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        koreanName: true,
                        image: true,
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            data: album
        });

    } catch (error) {
        console.error('Error updating album:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update album' },
            { status: 500 }
        );
    }
}

// DELETE: Delete album
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
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

        // Get album to delete images
        const album = await prisma.album.findUnique({
            where: { id: params.id }
        });

        if (!album) {
            return NextResponse.json(
                { success: false, error: 'Album not found' },
                { status: 404 }
            );
        }

        // Delete album from database
        await prisma.album.delete({
            where: { id: params.id }
        });

        // Delete image files (best effort - don't fail if file deletion fails)
        for (const imageUrl of album.images) {
            try {
                const imagePath = path.join(process.cwd(), 'public', imageUrl);
                await unlink(imagePath);
            } catch (error) {
                console.warn(`Failed to delete image file: ${imageUrl}`, error);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Album deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting album:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete album' },
            { status: 500 }
        );
    }
}
