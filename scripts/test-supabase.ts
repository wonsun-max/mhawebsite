// Supabase Storage 연결 테스트
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('\n🔍 Supabase 연결 테스트\n')
console.log('━'.repeat(50))

if (!supabaseUrl || !supabaseKey) {
    console.log('❌ 환경 변수가 설정되지 않았습니다!')
    console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ 설정됨' : '❌ 없음')
    console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅ 설정됨' : '❌ 없음')
    process.exit(1)
}

console.log('✅ 환경 변수 확인 완료')
console.log(`📍 Supabase URL: ${supabaseUrl}`)
console.log('')

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function testConnection() {
    try {
        console.log('🔌 Supabase Storage 연결 중...\n')

        // List all buckets
        const { data: buckets, error } = await supabase.storage.listBuckets()

        if (error) {
            console.log('❌ 연결 실패:', error.message)
            return
        }

        console.log('✅ Supabase Storage 연결 성공!\n')
        console.log('📦 현재 버킷 목록:')
        console.log('━'.repeat(50))

        if (buckets && buckets.length > 0) {
            buckets.forEach(bucket => {
                console.log(`  ${bucket.public ? '🌐' : '🔒'} ${bucket.name} ${bucket.public ? '(Public)' : '(Private)'}`)
            })
        } else {
            console.log('  ⚠️  버킷이 없습니다!')
        }

        console.log('\n' + '━'.repeat(50))
        console.log('\n필요한 버킷:')
        const requiredBuckets = ['albums', 'posts', 'missionaries']

        requiredBuckets.forEach(name => {
            const exists = buckets?.find(b => b.name === name)
            if (exists) {
                console.log(`  ✅ ${name} - ${exists.public ? 'Public' : 'Private'}`)
            } else {
                console.log(`  ❌ ${name} - 생성 필요!`)
            }
        })

        console.log('\n━'.repeat(50))

    } catch (error) {
        console.log('❌ 오류 발생:', error)
    }
}

testConnection()
