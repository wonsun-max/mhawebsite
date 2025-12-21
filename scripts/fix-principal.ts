// 곽인환 선교사님 데이터 확인 및 수정
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function fixPrincipal() {
    try {
        console.log('\n🔍 곽인환 선교사님 데이터 확인\n')

        // 이름으로 검색
        const principal = await prisma.mKMissionary.findFirst({
            where: {
                OR: [
                    { name: { contains: '곽인환' } },
                    { koreanName: { contains: '곽인환' } }
                ]
            }
        })

        if (principal) {
            console.log(`찾았습니다: ${principal.name} (${principal.koreanName})`)
            console.log(`현재 상태: 부서=${principal.description}, 직책=${principal.role}`)

            // 업데이트
            const updated = await prisma.mKMissionary.update({
                where: { id: principal.id },
                data: {
                    description: '학교장',
                    role: '교장'
                }
            })

            console.log('\n✅ 수정 완료!')
            console.log(`변경 후: 부서=${updated.description}, 직책=${updated.role}`)
        } else {
            console.log('❌ 곽인환 선교사님을 찾을 수 없습니다.')
        }

    } catch (error) {
        console.error('❌ 오류 발생:', error)
    } finally {
        await prisma.$disconnect()
    }
}

fixPrincipal()
