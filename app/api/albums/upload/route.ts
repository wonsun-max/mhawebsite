import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadMultipleToSupabase } from '@/lib/supabase-upload';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is admin
        if (session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const formData = await request.formData();
        const files = formData.getAll('files') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
        }

        // Validate file types
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        for (const file of files) {
            if (!validTypes.includes(file.type)) {
                return NextResponse.json({
                    error: `Invalid file type for ${file.name}. Only JPG, PNG, GIF, WEBP are allowed.`
                }, { status: 400 });
            }

            // Validate file size (15MB per file)
            if (file.size > 15 * 1024 * 1024) {
                return NextResponse.json({
                    error: `File ${file.name} is too large. Max 15MB per file.`
                }, { status: 400 });
            }
        }

        // Upload all files to Supabase Storage
        const imageUrls = await uploadMultipleToSupabase(files, 'albums');

        return NextResponse.json({
            message: 'Images uploaded successfully',
            imageUrls
        });

    } catch (error) {
        console.error('Error uploading images:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Internal Server Error'
        }, { status: 500 });
    }
}
