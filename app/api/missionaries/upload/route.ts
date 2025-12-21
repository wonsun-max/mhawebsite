import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadToSupabase } from '@/lib/supabase-upload';

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
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({
                error: 'Invalid file type. Only JPG, PNG, GIF, WEBP are allowed.'
            }, { status: 400 });
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({
                error: 'File is too large. Max 5MB.'
            }, { status: 400 });
        }

        // Upload to Supabase Storage
        const imageUrl = await uploadToSupabase(file, 'missionaries');

        return NextResponse.json({
            message: 'Image uploaded successfully',
            imageUrl
        });

    } catch (error) {
        console.error('Error uploading missionary image:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Internal Server Error'
        }, { status: 500 });
    }
}
