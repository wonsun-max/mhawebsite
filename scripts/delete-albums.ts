// 기존 앨범 데이터 삭제 스크립트
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
dotenv.config({ path: '.env.local' })


const prisma = new PrismaClient()

async function deleteAllAlbums() {
    try {
        console.log('🗑️  기존 앨범 데이터 삭제 중...')

        const result = await prisma.album.deleteMany({})

        console.log(`✅ ${result.count}개의 앨범이 삭제되었습니다.`)
        console.log('✨ 이제 Supabase Storage로 새로 업로드할 수 있습니다!')
    } catch (error) {
        console.error('❌ 삭제 중 오류 발생:', error)
    } finally {
        await prisma.$disconnect()
    }
}

deleteAllAlbums()
