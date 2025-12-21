import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, GIF, WEBP are allowed.' }, { status: 400 });
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size too large. Max 5MB.' }, { status: 400 });
        }

        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            // Ignore error if directory already exists
        }

        // Generate unique filename
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${session.user.id}-${Date.now()}${path.extname(file.name)}`;
        const filepath = path.join(uploadDir, filename);

        // Write file to disk
        await writeFile(filepath, buffer);

        // Public URL path
        const imageUrl = `/uploads/profiles/${filename}`;

        // Update user in DB
        await prisma.user.update({
            where: { email: session.user.email },
            data: { image: imageUrl },
        });

        return NextResponse.json({
            message: 'Image uploaded successfully',
            imageUrl
        });

    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
