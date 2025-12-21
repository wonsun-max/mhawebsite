'use client'
import ContentPageLayout from '@/components/ContentPageLayout'
import Timeline from '@/components/Timeline'
import { historyEvents } from '@/lib/schoolData'
import { aboutSubNav } from '@/lib/subNavConfig'

export default function HistoryPage() {
  return (
    <ContentPageLayout
      title="학교 연혁"
      subtitle="School History"
      heroImageUrl="/images/history.jpg"
      heroImageAlt="School History"
      subNav={aboutSubNav}
    >
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-white mb-6">학교 연혁</h1>
        <p className="text-white/80 mb-8">MHA의 주요 이정표에 대한 간략한 타임라인입니다.</p>
        <Timeline events={historyEvents} />
      </div>
    </ContentPageLayout>
  )
}