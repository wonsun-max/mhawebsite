// FILE: lib/sampleData.ts
export type Announcement = {
  id: string;
  title: string;
  date: string; // ISO or display date
  body?: string;
};

export const announcements: Announcement[] = [
  { id: 'a1', title: '2025학년도 2학기 개학 안내', date: '2025-09-01', body: '개학은 9월 1일입니다. 등교 시간 및 준비물 안내를 확인하세요.' },
  { id: 'a2', title: '가을운동회 개최', date: '2025-10-15', body: '전교생 대상 가을운동회를 개최합니다. 참여 표준 계획을 확인하세요.' },
];

export const galleryPhotos = [
  '/images/campus1.jpg',
  '/images/campus2.jpg',
  '/images/event1.jpg',
  '/images/event2.jpg'
];
