// MK선교사 데이터 마이그레이션 스크립트
// Role <-> Description 필드 교체 및 정규화
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'

// Load environment variables
dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

// 표준 부서 목록
const DEPARTMENTS = [
    '학교장', '교목실', '초등', '중등', '행정실', '도서관', '생활관', '보건실'
]

// 표준 직책 목록
const ROLES = [
    '교장', '교감', '교목', '담임교사', '교사', '행정실장', '행정직원', '사서', '사감', '보건교사'
]

async function migrateMissionaries() {
    try {
        console.log('\n🚀 MK선교사 데이터 마이그레이션 시작\n')

        // 1. 데이터 조회
        const missionaries = await prisma.mKMissionary.findMany()
        console.log(`총 ${missionaries.length}명의 데이터를 찾았습니다.`)

        // 2. 백업
        await fs.writeFile(
            'missionaries_backup.json',
            JSON.stringify(missionaries, null, 2)
        )
        console.log('✅ 데이터 백업 완료 (missionaries_backup.json)\n')

        let updatedCount = 0

        // 3. 데이터 변환 및 업데이트
        for (const m of missionaries) {
            // 현재 값 (반대로 되어 있음)
            const currentRole = m.role // 실제로는 부서 정보 (예: "초등")
            const currentDesc = m.description // 실제로는 직책 정보 (예: "교사")

            // 새로운 값 결정
            let newDepartment = '기타'
            let newRole = '기타'

            // 부서 매핑 (Role -> Description)
            // 정확히 일치하는 부서명이 있으면 사용, 없으면 포함 여부 확인
            if (DEPARTMENTS.includes(currentRole)) {
                newDepartment = currentRole
            } else {
                const found = DEPARTMENTS.find(d => currentRole.includes(d))
                if (found) newDepartment = found
            }

            // 직책 매핑 (Description -> Role)
            if (ROLES.includes(currentDesc)) {
                newRole = currentDesc
            } else if (currentDesc === '실장') {
                newRole = '행정실장'
            } else {
                // 매핑되지 않은 경우 기존 값 유지하되 '기타'로 분류될 수 있음
                // 여기서는 최대한 기존 값을 살리는 방향으로
                newRole = currentDesc
            }

            console.log(`[${m.name}]`)
            console.log(`  이전: 부서=${currentRole}, 직책=${currentDesc}`)
            console.log(`  변경: 부서=${newDepartment}, 직책=${newRole}`)

            // DB 업데이트
            await prisma.mKMissionary.update({
                where: { id: m.id },
                data: {
                    role: newRole,
                    description: newDepartment
                }
            })

            updatedCount++
        }

        console.log(`\n✅ 총 ${updatedCount}명의 데이터가 업데이트되었습니다.`)

    } catch (error) {
        console.error('❌ 오류 발생:', error)
    } finally {
        await prisma.$disconnect()
    }
}

migrateMissionaries()
