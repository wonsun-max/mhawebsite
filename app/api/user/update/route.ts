import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { username } = body;

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        // Validate username format (English, numbers, underscore, period only)
        if (!/^[a-zA-Z0-9._]+$/.test(username)) {
            return NextResponse.json({
                error: '아이디는 영문, 숫자, 밑줄(_), 마침표(.)만 사용할 수 있습니다.'
            }, { status: 400 });
        }

        if (username.length < 4 || username.length > 20) {
            return NextResponse.json({
                error: '아이디는 4자 이상 20자 이하이어야 합니다.'
            }, { status: 400 });
        }

        // Check if username is already taken (excluding current user)
        const existingUser = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive', // Case-insensitive check
                },
                NOT: {
                    email: session.user.email,
                },
            },
        });

        if (existingUser) {
            return NextResponse.json({ error: '이미 사용 중인 아이디입니다.' }, { status: 409 });
        }

        // Update user
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: { username },
        });

        return NextResponse.json({
            message: '아이디가 변경되었습니다.',
            user: {
                username: updatedUser.username,
            }
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
