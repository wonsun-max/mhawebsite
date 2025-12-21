// 선교사 데이터 확인 스크립트
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function checkMissionaries() {
    try {
        console.log('\n🔍 MK선교사 데이터 확인\n')

        const missionaries = await prisma.mKMissionary.findMany()

        console.log(`총 ${missionaries.length}명의 선교사님이 있습니다.\n`)

        if (missionaries.length > 0) {
            console.log('데이터 목록:')
            console.log('----------------------------------------')
            missionaries.forEach(m => {
                console.log(`이름: ${m.name} (${m.koreanName})`)
                console.log(`역할(Role): ${m.role}`)
                console.log(`부서(Description): ${m.description}`) // 여기가 중요!
                console.log('----------------------------------------')
            })
        }

    } catch (error) {
        console.error('❌ 오류 발생:', error)
    } finally {
        await prisma.$disconnect()
    }
}

checkMissionaries()
