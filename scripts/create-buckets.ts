// Supabase Storage 버킷 자동 생성 스크립트
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function createBuckets() {
    console.log('\n🚀 Supabase Storage 버킷 생성 시작\n')
    console.log('━'.repeat(50))

    const bucketsToCreate = [
        { name: 'albums', public: true },
        { name: 'posts', public: true },
        { name: 'missionaries', public: true }
    ]

    for (const bucket of bucketsToCreate) {
        try {
            console.log(`\n📦 "${bucket.name}" 버킷 생성 중...`)

            const { data, error } = await supabase.storage.createBucket(bucket.name, {
                public: bucket.public,
                fileSizeLimit: 52428800, // 50MB
                allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'application/pdf']
            })

            if (error) {
                if (error.message.includes('already exists')) {
                    console.log(`  ⚠️  이미 존재합니다 (건너뜀)`)
                } else {
                    console.log(`  ❌ 실패: ${error.message}`)
                }
            } else {
                console.log(`  ✅ 성공! (${bucket.public ? 'Public' : 'Private'})`)
            }
        } catch (error) {
            console.log(`  ❌ 오류:`, error)
        }
    }

    console.log('\n' + '━'.repeat(50))
    console.log('\n🔍 최종 버킷 목록 확인 중...\n')

    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (buckets) {
        buckets.forEach(bucket => {
            console.log(`  ${bucket.public ? '🌐' : '🔒'} ${bucket.name} ${bucket.public ? '(Public)' : '(Private)'}`)
        })
    }

    console.log('\n━'.repeat(50))
    console.log('\n✅ 버킷 생성 완료!\n')
}

createBuckets()
