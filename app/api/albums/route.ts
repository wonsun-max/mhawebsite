import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET: Fetch all albums
export async function GET() {
    try {
        const albums = await prisma.album.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        koreanName: true,
                        image: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({
            success: true,
            data: albums
        });
    } catch (error) {
        console.error('Error fetching albums:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch albums' },
            { status: 500 }
        );
    }
}

// POST: Create new album
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

        // Create album
        const album = await prisma.album.create({
            data: {
                title: title.trim(),
                description: description?.trim() || null,
                images: images,
                authorId: user.id
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
        console.error('Error creating album:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create album' },
            { status: 500 }
        );
    }
}
