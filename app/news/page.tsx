'use client';

import ContentPageLayout from '@/components/ContentPageLayout';
import AnimatedOnView from '@/components/AnimatedOnView';
import NewsCard from '@/components/NewsCard';
import { newsList } from '@/lib/newsData';

export default function NewsPage() {
  return (
    <ContentPageLayout
      title="News & Announcements"
      subtitle="Stay up to date with the latest from MHA."
      heroImageUrl="/images/event1.jpg"
      heroImageAlt="News and Announcements"
    >
      <div className="max-w-6xl mx-auto text-white py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <AnimatedOnView key={news.id}>
              <NewsCard news={news} />
            </AnimatedOnView>
          ))}
        </div>
      </div>
    </ContentPageLayout>
  );
}
